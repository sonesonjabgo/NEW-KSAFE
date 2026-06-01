import { printToFileAsync } from "expo-print"
import { shareAsync } from "expo-sharing"

export interface PatrolReportData {
  workplaceName: string
  date: string
  author: string
  reviewer?: string
  approver?: string
  checkItems: Array<{
    name: string
    result: "good" | "bad"
    note?: string
  }>
  overallAction?: string
  totalCount: number
  goodCount: number
  badCount: number
}

export const generatePatrolReport = async (data: PatrolReportData): Promise<string> => {
  const checkRows = data.checkItems
    .map(
      (item) => `
    <tr>
      <td class="checkpoint-name">${item.name}</td>
      <td class="result-cell">${item.result === "good" ? "○" : ""}</td>
      <td class="result-cell">${item.result === "bad" ? "○" : ""}</td>
      <td class="action-cell">${item.note || ""}</td>
    </tr>
  `,
    )
    .join("")

  const html = `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          @page {
            size: A4;
            margin: 15mm 12mm;
          }

          * { box-sizing: border-box; }

          body {
            font-family: 'Noto Sans KR', 'Malgun Gothic', '맑은 고딕', sans-serif;
            font-size: 11px;
            color: #000;
            margin: 0;
            padding: 0;
          }

          h1 {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            margin: 0 0 16px 0;
            padding-bottom: 4px;
            letter-spacing: 4px;
          }

          /* 서명란 (작성/검토/승인) */
          .sign-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0;
          }
          .sign-table td {
            border: 1px solid #000;
            text-align: center;
            padding: 5px 4px;
            font-size: 11px;
            vertical-align: middle;
          }
          .sign-label {
            background-color: #90EE90;
            font-weight: bold;
            width: 50px;
          }
          .sign-value {
            width: 100px;
            min-height: 30px;
          }

          /* 기본 정보 테이블 */
          .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: -1px;
            margin-bottom: 12px;
          }
          .info-table td {
            border: 1px solid #000;
            padding: 6px 8px;
            font-size: 11px;
            vertical-align: middle;
          }
          .info-label {
            background-color: #90EE90;
            font-weight: bold;
            text-align: center;
            width: 70px;
          }
          .info-value {
            text-align: left;
          }

          /* 점검 항목 테이블 */
          .inspection-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0;
            border-top: 2px solid #000;
          }
          .inspection-table th,
          .inspection-table td {
            border: 1px solid #000;
            padding: 6px 4px;
            text-align: center;
            font-size: 11px;
            vertical-align: middle;
          }
          .section-header {
            background-color: #90EE90;
            font-weight: bold;
            font-size: 12px;
            text-align: left;
            padding-left: 10px;
          }
          .col-header {
            background-color: #90EE90;
            font-weight: bold;
          }
          .checkpoint-name {
            text-align: left;
            padding-left: 10px;
            width: 55%;
          }
          .result-cell {
            width: 9%;
            font-size: 14px;
          }
          .action-cell {
            text-align: left;
            padding-left: 8px;
            width: 27%;
          }
          .summary-row td {
            background-color: #f5f5f5;
            font-weight: bold;
          }

          /* 전체 조치사항 */
          .overall-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: -1px;
            border-top: 2px solid #000;
          }
          .overall-table td {
            border: 1px solid #000;
            padding: 8px 10px;
            font-size: 11px;
            vertical-align: top;
          }
          .overall-header {
            background-color: #90EE90;
            font-weight: bold;
            text-align: left;
          }
          .overall-content {
            min-height: 70px;
            line-height: 1.6;
          }

          /* 페이지 나눔 방지 */
          tr { page-break-inside: avoid; }
          table { page-break-inside: auto; }
        </style>
      </head>
      <body>
        <h1>작업장 순회점검 일지</h1>

        <!-- 서명란 -->
        <table class="sign-table">
          <tr>
            <td class="sign-label">작성</td>
            <td class="sign-value">${data.author}</td>
            <td class="sign-label">검토</td>
            <td class="sign-value">${data.reviewer ?? ""}</td>
            <td class="sign-label">승인</td>
            <td class="sign-value">${data.approver ?? ""}</td>
          </tr>
        </table>

        <!-- 기본 정보 -->
        <table class="info-table">
          <tr>
            <td class="info-label">사업장</td>
            <td class="info-value" colspan="3">${data.workplaceName}</td>
          </tr>
          <tr>
            <td class="info-label">점검일</td>
            <td class="info-value" colspan="3">${data.date}</td>
          </tr>
        </table>

        <!-- 점검 항목 -->
        <table class="inspection-table">
          <tr>
            <td colspan="4" class="section-header">● 점검사항</td>
          </tr>
          <tr>
            <th class="col-header checkpoint-name">점검사항</th>
            <th class="col-header result-cell">양호</th>
            <th class="col-header result-cell">불량</th>
            <th class="col-header action-cell">조치사항</th>
          </tr>
          ${checkRows}
          <tr class="summary-row">
            <td class="checkpoint-name">합 계 (전체 ${data.totalCount}개)</td>
            <td class="result-cell">${data.goodCount}</td>
            <td class="result-cell">${data.badCount}</td>
            <td class="action-cell"></td>
          </tr>
        </table>

        ${
          data.overallAction
            ? `
        <!-- 전체 조치사항 -->
        <table class="overall-table">
          <tr>
            <td class="overall-header">● 전체 조치 요구사항</td>
          </tr>
          <tr>
            <td class="overall-content">${data.overallAction.replace(/\n/g, "<br/>")}</td>
          </tr>
        </table>
        `
            : ""
        }
      </body>
    </html>
  `

  const { uri } = await printToFileAsync({ html, base64: false })
  return uri
}

export const generateAndSharePatrolReport = async (
  data: PatrolReportData,
  isDownload?: boolean,
) => {
  const uri = await generatePatrolReport(data)

  if (isDownload) {
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" })
  }

  return uri
}

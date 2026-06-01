import { printToFileAsync } from "expo-print"
import { shareAsync } from "expo-sharing"

export interface PatrolReportData {
  workplaceName: string
  date: string
  author: string
  reviewer?: string
  approver?: string
  inspectionItems: Array<{
    name: string
    checkpoints: Array<{
      name: string
      result: "good" | "bad" | null
      action?: string
    }>
  }>
  overallAction?: string
}

export const generatePatrolReport = async (data: PatrolReportData): Promise<string> => {
  const inspectionRows = data.inspectionItems
    .map((item) => {
      const checkpointRows = item.checkpoints
        .map(
          (cp, cpIndex) => `
        <tr>
          ${cpIndex === 0 ? `<td rowspan="${item.checkpoints.length}" class="item-name">${item.name}</td>` : ""}
          <td class="checkpoint-name">${cp.name}</td>
          <td class="result-cell">${cp.result === "good" ? "양호" : cp.result === "bad" ? "불량" : ""}</td>
          <td class="result-cell">${cp.result === "good" ? "" : cp.result === "bad" ? "" : "양호"}</td>
          <td class="action-cell">${cp.action || ""}</td>
        </tr>
      `,
        )
        .join("")
      return checkpointRows
    })
    .join("")

  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          @page {
            size: A4;
            margin: 10mm;
          }

          body {
            font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
            padding: 15px;
            font-size: 11px;
          }

          h1 {
            text-align: center;
            font-size: 20px;
            margin: 0 0 10px 0;
            text-decoration: underline;
            font-weight: bold;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
            page-break-inside: auto;
          }

          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }

          th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: center;
            font-size: 11px;
            vertical-align: middle;
          }

          .header-table {
            margin-bottom: 0;
          }

          .header-label {
            background-color: #90EE90;
            font-weight: bold;
            width: 80px;
          }

          .header-value {
            text-align: left;
            padding-left: 10px;
          }

          .inspection-table {
            border-top: 2px solid #000;
          }

          .section-header {
            background-color: #90EE90;
            font-weight: bold;
            text-align: center;
          }

          .column-header {
            background-color: #90EE90;
            font-weight: bold;
            text-align: center;
            padding: 8px 4px;
          }

          .item-name {
            background-color: #f5f5f5;
            font-weight: bold;
            width: 100px;
            text-align: center;
            vertical-align: middle;
          }

          .checkpoint-name {
            text-align: left;
            padding-left: 10px;
            width: 280px;
          }

          .result-cell {
            width: 50px;
          }

          .action-cell {
            text-align: left;
            padding-left: 10px;
            min-width: 100px;
          }

          .overall-action-section {
            border-top: 2px solid #000;
          }

          .overall-action-header {
            background-color: #90EE90;
            font-weight: bold;
            text-align: left;
            padding-left: 10px;
          }

          .overall-action-content {
            text-align: left;
            padding: 10px;
            min-height: 80px;
            vertical-align: top;
          }
        </style>
      </head>
      <body>
        <h1>작업장 순회점검 일지</h1>

        <table class="header-table">
          <tr>
            <td class="header-label">작성</td>
            <td class="header-value" width="150">${data.author}</td>
            <td class="header-label">검토</td>
            <td class="header-value" width="150">${data.reviewer || ""}</td>
            <td class="header-label">승인</td>
            <td class="header-value" width="150">${data.approver || ""}</td>
          </tr>
        </table>

        <table class="header-table" style="margin-top: -1px;">
          <tr>
            <td class="header-label">사업장</td>
            <td class="header-value" colspan="5">${data.workplaceName}</td>
          </tr>
          <tr>
            <td class="header-label">점검일</td>
            <td class="header-value" colspan="5">${data.date}</td>
          </tr>
        </table>

        <table class="inspection-table">
          <tr>
            <th colspan="5" class="section-header">●점검사항</th>
          </tr>
          <tr>
            <th class="column-header">점검항목</th>
            <th class="column-header">점검사항</th>
            <th class="column-header" width="50">양호</th>
            <th class="column-header" width="50">불량</th>
            <th class="column-header">조치사항</th>
          </tr>
          ${inspectionRows}
        </table>

        ${
          data.overallAction
            ? `
        <table class="overall-action-section">
          <tr>
            <td class="overall-action-header">●전체 조치 요구사항</td>
          </tr>
          <tr>
            <td class="overall-action-content">${data.overallAction.replace(/\n/g, "<br/>")}</td>
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

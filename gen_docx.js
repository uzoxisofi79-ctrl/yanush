const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak
} = require("docx");

// Helper: heading paragraph
function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 200 }, children: [new TextRun({ text, bold: true, font: "Arial", size: 32 })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 160 }, children: [new TextRun({ text, bold: true, font: "Arial", size: 28 })] });
}
function h3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 120 }, children: [new TextRun({ text, bold: true, font: "Arial", size: 24 })] });
}

// Body paragraph
function p(text, opts = {}) {
  const runs = [];
  if (typeof text === "string") {
    runs.push(new TextRun({ text, font: "Arial", size: 24, ...opts }));
  } else {
    // array of run objects
    text.forEach(r => runs.push(new TextRun({ font: "Arial", size: 24, ...r })));
  }
  return new Paragraph({ spacing: { after: 120 }, children: runs });
}

// Bold label + regular value on same line
function field(label, value, valueOpts = {}) {
  return new Paragraph({ spacing: { after: 100 }, children: [
    new TextRun({ text: label + " ", font: "Arial", size: 24, bold: true }),
    new TextRun({ text: value, font: "Arial", size: 24, ...valueOpts }),
  ]});
}

// Italic system message
function sysMsg(label, value) {
  return new Paragraph({ spacing: { after: 100 }, children: [
    new TextRun({ text: label + " ", font: "Arial", size: 24, bold: true }),
    new TextRun({ text: value, font: "Arial", size: 24, italics: true }),
  ]});
}

// Bullet item
const bulletRef = "bullets";
function bullet(text, level = 0) {
  const runs = [];
  if (typeof text === "string") {
    runs.push(new TextRun({ text, font: "Arial", size: 24 }));
  } else {
    text.forEach(r => runs.push(new TextRun({ font: "Arial", size: 24, ...r })));
  }
  return new Paragraph({ numbering: { reference: bulletRef, level }, spacing: { after: 80 }, children: runs });
}

// Numbered item
const numRef = "numbers";
function numItem(text, level = 0) {
  const runs = [];
  if (typeof text === "string") {
    runs.push(new TextRun({ text, font: "Arial", size: 24 }));
  } else {
    text.forEach(r => runs.push(new TextRun({ font: "Arial", size: 24, ...r })));
  }
  return new Paragraph({ numbering: { reference: numRef, level }, spacing: { after: 80 }, children: runs });
}

function spacer() {
  return new Paragraph({ spacing: { after: 60 }, children: [] });
}

// Separator line
function separator() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC", space: 1 } },
    children: [],
  });
}

// ---- Build all content ----
const content = [];

// ============ TITLE PAGE ============
content.push(new Paragraph({ spacing: { before: 4000 }, children: [] }));
content.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
  new TextRun({ text: "\u042F\u041D\u0423\u0428", font: "Arial", size: 72, bold: true, color: "1F3864" }),
]}));
content.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [
  new TextRun({ text: "\u041F\u043E\u043B\u043D\u043E\u0435 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u043E\u0435 \u043D\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0441\u0430\u0439\u0442\u0430", font: "Arial", size: 36, color: "2E75B6" }),
]}));
content.push(separator());
content.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 120 }, children: [
  new TextRun({ text: "\u0412\u0441\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438, \u043F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438, \u0442\u0435\u043A\u0441\u0442\u044B, \u043D\u0430\u0434\u043F\u0438\u0441\u0438 \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0430\u0445,", font: "Arial", size: 24, color: "404040" }),
]}));
content.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
  new TextRun({ text: "\u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440\u044B, \u0442\u0443\u043B\u0442\u0438\u043F\u044B, \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F", font: "Arial", size: 24, color: "404040" }),
]}));

// page break after title
content.push(new Paragraph({ children: [new PageBreak()] }));

// ============ TABLE OF CONTENTS ============
content.push(new Paragraph({ spacing: { after: 300 }, children: [
  new TextRun({ text: "\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435", font: "Arial", size: 32, bold: true }),
]}));
content.push(new TableOfContents("\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435", { hyperlink: true, headingStyleRange: "1-3" }));
content.push(new Paragraph({ children: [new PageBreak()] }));

// ============ 1. HTML-МЕТАДАННЫЕ ============
content.push(h1("1. HTML-\u043C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0435"));
field("\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B (title):", "\u042F\u041D\u0423\u0428 \u2014 \u0442\u0440\u0435\u043D\u0430\u0436\u0451\u0440 \u043F\u0435\u0434\u0430\u0433\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0434\u0438\u0430\u043B\u043E\u0433\u043E\u0432 \u0441 \u0418\u0418-\u043F\u043E\u0434\u0440\u043E\u0441\u0442\u043A\u043E\u043C");
content.push(field("\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B (title):", "\u042F\u041D\u0423\u0428 \u2014 \u0442\u0440\u0435\u043D\u0430\u0436\u0451\u0440 \u043F\u0435\u0434\u0430\u0433\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0434\u0438\u0430\u043B\u043E\u0433\u043E\u0432 \u0441 \u0418\u0418-\u043F\u043E\u0434\u0440\u043E\u0441\u0442\u043A\u043E\u043C"));
content.push(field("\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (meta description):", "\u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0442\u0440\u0435\u043D\u0430\u0436\u0451\u0440, \u0432 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u043F\u0435\u0434\u0430\u0433\u043E\u0433 \u0432\u0435\u0434\u0451\u0442 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u0434\u0438\u0430\u043B\u043E\u0433 \u0441 \u0418\u0418-\u043F\u043E\u0434\u0440\u043E\u0441\u0442\u043A\u043E\u043C. 11 \u0430\u043A\u0446\u0435\u043D\u0442\u0443\u0430\u0446\u0438\u0439 \u043F\u043E \u041B\u0438\u0447\u043A\u043E, \u0430\u0434\u0430\u043F\u0442\u0438\u0432\u043D\u044B\u0435 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0438, \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u043D\u0430\u044F \u043E\u0446\u0435\u043D\u043A\u0430."));
content.push(separator());

// Continue building...

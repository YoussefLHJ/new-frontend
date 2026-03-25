import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Workbook } from 'exceljs';
@Injectable({
    providedIn: 'root'
})
export class ExportService {

    exportExcel(title: string, data: Record<string, any>[], criteria: string[], filename: string, filterLabel = 'Filters') {
        if (!data.length) return;

        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(title);
        const headers = Object.keys(data[0]);
        const colCount = headers.length;

        // Title
        const titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FF1E293B' } };
        titleRow.height = 28;
        if (colCount > 1) worksheet.mergeCells(1, 1, 1, colCount);

        // Date
        const dateRow = worksheet.addRow([new Date().toLocaleString()]);
        dateRow.font = { name: 'Calibri', size: 9, italic: true, color: { argb: 'FF6B7280' } };
        if (colCount > 1) worksheet.mergeCells(2, 1, 2, colCount);

        worksheet.addRow([]);

        // Filter criteria
        if (criteria.length) {
            const filterTitleRow = worksheet.addRow([filterLabel]);
            filterTitleRow.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF374151' } };
            if (colCount > 1) worksheet.mergeCells(filterTitleRow.number, 1, filterTitleRow.number, colCount);

            criteria.forEach(c => {
                const row = worksheet.addRow([`  \u2022 ${c}`]);
                row.font = { name: 'Calibri', size: 9, color: { argb: 'FF6B7280' } };
                if (colCount > 1) worksheet.mergeCells(row.number, 1, row.number, colCount);
            });

            worksheet.addRow([]);
        }

        // Column headers
        const headerRow = worksheet.addRow(headers);
        headerRow.height = 24;
        headerRow.eachCell((cell: any) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF3B82F6' } };
            cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.border = {
                top: { style: 'thin', color: { argb: 'FF2563EB' } },
                bottom: { style: 'thin', color: { argb: 'FF2563EB' } },
                left: { style: 'thin', color: { argb: 'FF2563EB' } },
                right: { style: 'thin', color: { argb: 'FF2563EB' } }
            };
        });

        // Data rows with alternating colors
        data.forEach((item, idx) => {
            const row = worksheet.addRow(headers.map(h => item[h] ?? ''));
            row.eachCell((cell: any) => {
                cell.font = { name: 'Calibri', size: 10 };
                cell.alignment = { vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
                    bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
                    left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
                    right: { style: 'thin', color: { argb: 'FFE5E7EB' } }
                };
                if (idx % 2 === 0) {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
                }
            });
        });

        // Auto-fit column widths
        headers.forEach((h, i) => {
            let maxLen = h.length;
            data.forEach(item => {
                const len = String(item[h] ?? '').length;
                if (len > maxLen) maxLen = len;
            });
            worksheet.getColumn(i + 1).width = Math.min(Math.max(maxLen + 3, 12), 45);
        });

        // Generate file
        workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
            });
            saveAs(blob, `${filename}.xlsx`);
        });
    }

    exportPdf(title: string, data: Record<string, any>[], criteria: string[], filename: string, filterLabel = 'Filters') {
        if (!data.length) return;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 41, 59);
        doc.text(title, 14, 20);

        // Date (right-aligned)
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 114, 128);
        doc.text(new Date().toLocaleString(), pageWidth - 14, 20, { align: 'right' });

        // Separator line
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.5);
        doc.line(14, 25, pageWidth - 14, 25);

        let startY = 32;

        // Filter criteria
        if (criteria.length) {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(55, 65, 81);
            doc.text(filterLabel, 14, startY);
            startY += 6;

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(107, 114, 128);
            criteria.forEach(c => {
                doc.text(`\u2022 ${c}`, 18, startY);
                startY += 5;
            });
            startY += 4;
        }

        // Data table
        const headers = Object.keys(data[0]);
        autoTable(doc, {
            head: [headers],
            body: data.map(row => headers.map(h => String(row[h] ?? ''))),
            startY,
            margin: { left: 14, right: 14 },
            styles: {
                fontSize: 7,
                cellPadding: 2.5,
                overflow: 'linebreak',
                lineColor: [229, 231, 235],
                lineWidth: 0.3
            },
            headStyles: {
                fillColor: [59, 130, 246],
                textColor: 255,
                fontStyle: 'bold',
                halign: 'center'
            },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            theme: 'grid',
            showHead: 'everyPage'
        });

        // Page numbers on all pages
        const totalPages = (doc as any).internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(156, 163, 175);
            doc.text(`${i} / ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        }

        doc.save(`${filename}.pdf`);
    }

    exportCsv(title: string, data: Record<string, any>[], criteria: string[], filename: string, filterLabel = 'Filters') {
        if (!data.length) return;

        const BOM = '\uFEFF';
        const sep = ';';
        const headers = Object.keys(data[0]);
        const lines: string[] = [];

        // Metadata header
        lines.push(`# ${title}`);
        lines.push(`# ${new Date().toLocaleString()}`);
        if (criteria.length) {
            lines.push(`# ${filterLabel}: ${criteria.join(' | ')}`);
        }
        lines.push('');

        // Column headers
        lines.push(headers.map(h => this.escapeCsvValue(h, sep)).join(sep));

        // Data rows
        data.forEach(row => {
            lines.push(headers.map(h => this.escapeCsvValue(String(row[h] ?? ''), sep)).join(sep));
        });

        const blob = new Blob([BOM + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, `${filename}.csv`);
    }

    private escapeCsvValue(value: string, sep: string): string {
        if (value.includes(sep) || value.includes('"') || value.includes('\n') || value.includes('\r')) {
            return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
    }
}

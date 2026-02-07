/**
 * Export Utilities
 * Functions for exporting data to various formats
 */

/**
 * Convert data array to CSV string
 * @param {Array} data - Array of objects to convert
 * @param {Array} columns - Column definitions with { key, header } objects
 * @returns {string} CSV formatted string
 */
export function toCSV(data, columns) {
    if (!data || data.length === 0) return '';

    const headers = columns.map(col => `"${col.header || col.key}"`).join(',');
    const rows = data.map(item => {
        return columns.map(col => {
            const value = getNestedValue(item, col.key);
            // Escape quotes and wrap in quotes if contains comma or newline
            const stringValue = String(value ?? '');
            if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        }).join(',');
    }).join('\n');

    return `${headers}\n${rows}`;
}

/**
 * Download data as CSV file
 * @param {Array} data - Array of objects to export
 * @param {Array} columns - Column definitions
 * @param {string} filename - Name of the file (without extension)
 */
export function downloadCSV(data, columns, filename = 'export') {
    const csv = toCSV(data, columns);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `${filename}.csv`);
}

/**
 * Download data as JSON file
 * @param {any} data - Data to export
 * @param {string} filename - Name of the file (without extension)
 */
export function downloadJSON(data, filename = 'export') {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    downloadBlob(blob, `${filename}.json`);
}

/**
 * Generate and download PDF report
 * Note: This is a placeholder - actual PDF generation would require a library like jsPDF
 * @param {Object} reportData - Report data object
 * @param {string} filename - Name of the file
 */
export function downloadPDF(reportData, filename = 'report') {
    // For now, we'll create a simple HTML representation that can be printed
    const html = generatePDFHTML(reportData);
    const blob = new Blob([html], { type: 'text/html' });

    // Open in new window for printing
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');

    if (printWindow) {
        printWindow.onload = () => {
            printWindow.print();
        };
    }

    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Generate HTML for PDF-like report
 * @param {Object} reportData - Report data
 * @returns {string} HTML string
 */
function generatePDFHTML(reportData) {
    const { title, date, sections = [], summary = {} } = reportData;

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${title || 'Report'}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            color: #1e293b;
        }
        .header {
            border-bottom: 2px solid #4f46e5;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            color: #4f46e5;
            font-size: 24px;
        }
        .header .date {
            color: #64748b;
            font-size: 14px;
            margin-top: 5px;
        }
        .summary {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
        }
        .summary-item h3 {
            margin: 0;
            font-size: 24px;
            color: #4f46e5;
        }
        .summary-item p {
            margin: 5px 0 0;
            font-size: 14px;
            color: #64748b;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            font-size: 18px;
            color: #1e293b;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #e2e8f0;
        }
        th {
            background: #f8fafc;
            font-size: 12px;
            text-transform: uppercase;
            color: #64748b;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
        }
        @media print {
            body { padding: 20px; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${title || 'Report'}</h1>
        <div class="date">Generated on ${date || new Date().toLocaleDateString()}</div>
    </div>
    
    ${Object.keys(summary).length > 0 ? `
    <div class="summary">
        <div class="summary-grid">
            ${Object.entries(summary).map(([key, value]) => `
                <div class="summary-item">
                    <h3>${value}</h3>
                    <p>${formatKey(key)}</p>
                </div>
            `).join('')}
        </div>
    </div>
    ` : ''}
    
    ${sections.map(section => `
        <div class="section">
            <h2>${section.title}</h2>
            ${section.type === 'table' ? generateTableHTML(section.data, section.columns) : ''}
            ${section.type === 'text' ? `<p>${section.content}</p>` : ''}
        </div>
    `).join('')}
    
    <div class="footer">
        <p>GoPass Admin Dashboard • Confidential Report</p>
    </div>
</body>
</html>
    `;
}

/**
 * Generate HTML table from data
 * @param {Array} data - Table data
 * @param {Array} columns - Column definitions
 * @returns {string} HTML table string
 */
function generateTableHTML(data, columns) {
    if (!data || data.length === 0) return '<p>No data available</p>';

    const headers = columns.map(col => `<th>${col.header || col.key}</th>`).join('');
    const rows = data.map(item => {
        const cells = columns.map(col => {
            const value = getNestedValue(item, col.key);
            return `<td>${col.format ? col.format(value) : value ?? '-'}</td>`;
        }).join('');
        return `<tr>${cells}</tr>`;
    }).join('');

    return `
        <table>
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

/**
 * Export data to Excel format
 * Note: This creates a simple HTML table that Excel can open
 * For proper XLSX, you'd use a library like xlsx
 * @param {Array} data - Data to export
 * @param {Array} columns - Column definitions
 * @param {string} filename - Name of the file
 */
export function downloadExcel(data, columns, filename = 'export') {
    const table = generateTableHTML(data, columns);
    const html = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" 
              xmlns:x="urn:schemas-microsoft-com:office:excel" 
              xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="utf-8">
            <!--[if gte mso 9]>
            <xml>
                <x:ExcelWorkbook>
                    <x:ExcelWorksheets>
                        <x:ExcelWorksheet>
                            <x:Name>Sheet1</x:Name>
                        </x:ExcelWorksheet>
                    </x:ExcelWorksheets>
                </x:ExcelWorkbook>
            </xml>
            <![endif]-->
        </head>
        <body>${table}</body>
        </html>
    `;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    downloadBlob(blob, `${filename}.xls`);
}

/**
 * Download a blob as a file
 * @param {Blob} blob - Blob to download
 * @param {string} filename - Name of the file
 */
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Get nested object value by dot notation
 * @param {Object} obj - Object to get value from
 * @param {string} path - Dot notation path
 * @returns {any} Value at path
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Format key to readable label
 * @param {string} key - Key to format
 * @returns {string} Formatted label
 */
function formatKey(key) {
    return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

/**
 * Common column definitions for exports
 */
export const columnDefinitions = {
    organizers: [
        { key: 'fullName', header: 'Full Name' },
        { key: 'email', header: 'Email' },
        { key: 'position', header: 'Position' },
        { key: 'isAdminApproved', header: 'Status', format: v => v ? 'Approved' : 'Pending' },
        { key: 'createdAt', header: 'Joined', format: v => new Date(v).toLocaleDateString() }
    ],
    events: [
        { key: 'title', header: 'Event Title' },
        { key: 'category', header: 'Category' },
        { key: 'date', header: 'Date' },
        { key: 'status', header: 'Status' },
        { key: 'registrationCount', header: 'Registrations' }
    ],
    registrations: [
        { key: 'attendee.name', header: 'Attendee Name' },
        { key: 'attendee.email', header: 'Email' },
        { key: 'event.title', header: 'Event' },
        { key: 'registeredAt', header: 'Registered At', format: v => new Date(v).toLocaleDateString() },
        { key: 'status', header: 'Status' }
    ]
};

export default {
    toCSV,
    downloadCSV,
    downloadJSON,
    downloadPDF,
    downloadExcel,
    columnDefinitions
};

export const BASE_URL =
    import.meta.env.VITE_APP_BASE_URL || 'http://localhost:4000';

export const API_PATH = {
    AUTH: {
        LOGIN: '/api/v1/auth/login',
        REGISTER: '/api/v1/auth/register',
        GET_USER_INFO: '/api/v1/auth/getUser',
        VERIFY_TOKEN: '/api/v1/auth/verifyToken',
    },
    DASHBOARD: {
        GET_DATA: '/api/v1/dashboard',
    },
    INCOME: {
        ADD_INCOME: '/api/v1/income/add',
        GET_ALL_INCOME: '/api/v1/income/get',
        DELETE_INCOME: (incomeId: string) => `/api/v1/income/delete${incomeId}`,
        DOWNLOAD_PDF_INCOME: '/api/v1/income/downloadPdf',
        DOWNLOAD_EXCEL_INCOME: '/api/v1/income/downloadExcel',
    },
    EXPENSE: {
        ADD_EXPENSE: '/api/v1/expense/add',
        GET_ALL_EXPENSE: '/api/v1/expense/get',
        DELETE_EXPENSE: (expenseId: string) =>
            `/api/v1/expense/delete/${expenseId}`,
        DOWNLOAD_PDF_EXPENSE: '/api/v1/expense/downloadPdf',
        DOWNLOAD_EXCEL_EXPENSE: '/api/v1/expense/downloadExcel',
    },
};

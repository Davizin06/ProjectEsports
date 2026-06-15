import styled from 'styled-components'

export const Container = styled.section`
    width: 100%;
    max-width: 1000px;
    margin: 24px auto 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
`

export const TeamBlock = styled.div`
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
`

export const TeamHeader = styled.header`
    padding: 16px 20px;
    border-bottom: 1px solid #eee;

    strong {
        color: #0077b6;
        font-size: 18px;
    }
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        padding: 12px 16px;
        text-align: center;
        font-size: 14px;
        border-bottom: 1px solid #f0f0f0;
    }

    th {
        font-size: 12px;
        text-transform: uppercase;
        color: #888;
        background: #f7f7f7;
    }

    td:first-child,
    th:first-child {
        text-align: left;
        color: #222;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }
`

export const EmptyRow = styled.td`
    color: #888;
    font-style: italic;
`

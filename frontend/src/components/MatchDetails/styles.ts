import styled from 'styled-components'

export const Container = styled.section`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #ddd;
    border-top: 4px solid #6c5ce7;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
`

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding: 24px 32px;
`

export const ChampionshipInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
        color: #0077b6;
        font-size: 16px;
    }

    span {
        color: #222;
        font-size: 15px;
    }

    small {
        color: #555;
        font-size: 13px;
    }
`

export const DateInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: right;
    font-size: 14px;

    em {
        color: #444;
    }
`

export const Scoreboard = styled.div`
    display: grid;
    grid-template-columns: 1fr 160px 1fr;
    align-items: center;
    padding: 56px 32px;
`

export const TeamName = styled.strong`
    font-size: 28px;
    color: #0077b6;
    text-align: center;
`

export const Score = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 40px;
    font-weight: 700;
    color: #444;
`

export const Versus = styled.span`
    color: #999;
`

export const Details = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #eee;
    background: #f7f7f7;
`

export const DetailItem = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;
    border-right: 1px solid #e1e1e1;

    &:last-child {
        border-right: none;
    }

    span {
        font-size: 12px;
        text-transform: uppercase;
        color: #888;
    }

    strong {
        font-size: 15px;
        color: #222;
    }
`
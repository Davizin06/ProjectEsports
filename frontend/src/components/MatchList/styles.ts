import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`

export const DayContainer = styled.div`
    background: #f1f1f1;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #d6d6d6;
`

export const DayHeader = styled.header`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: #d9d9d9;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: #333;
`

export const TodayBadge = styled.strong`
    background: #888;
    color: white;
    border-radius: 3px;
    padding: 2px 6px;
    font-size: 10px;
    text-transform: uppercase;
`

export const MatchListWrapper = styled.div`
    background: #fff;
`

export const Card = styled.button`
    width: 100%;
    display: grid;
    grid-template-columns: 120px 1fr 140px 140px 260px;
    align-items: center;
    min-height: 72px;
    padding: 10px 20px;
    border: none;
    border-bottom: 1px solid #ddd;
    gap: 20px;
    cursor: pointer;
    background: #fff;
    color: inherit;
    font: inherit;
    text-align: left;
    transition: background 0.2s ease;

    &:hover {
        background: #f5f5f5;
    }

    &:last-child {
        border-bottom: none;
    }
`

export const MatchTime = styled.div`
    font-size: 14px;
    color: #222;
    text-align: center;
`

export const Teams = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const TeamRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`

export const TeamName = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #1f1f1f;
`

export const Score = styled.span`
    color: #999;
    font-weight: 600;
`

export const StatusArea = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`

interface StatusBadgeProps {
    $variant: 'upcoming' | 'finished'
}

export const StatusBadge = styled.span<StatusBadgeProps>`
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 700;
    color: white;
    background: ${({ $variant }) =>
        $variant === 'upcoming' ? '#2f9e44' : '#555'};
`

export const CountdownBadge = styled.span`
    background: #45b36b;
    color: white;
    border-radius: 4px;
    padding: 6px 8px;
    font-size: 12px;
    font-weight: 700;
`

export const InfoArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: center;
`

export const Label = styled.span`
    font-size: 11px;
    color: #888;
    text-transform: uppercase;
`

export const InfoTitle = styled.strong`
    font-size: 13px;
    color: #222;
`

export const InfoSubtitle = styled.small`
    font-size: 12px;
    color: #777;
`
package com.POO.esports.dto;

public class DesempenhoPartidaResponse {

    private TimeDesempenhoResponse timeA;
    private TimeDesempenhoResponse timeB;

    public DesempenhoPartidaResponse() {
    }

    public DesempenhoPartidaResponse(TimeDesempenhoResponse timeA, TimeDesempenhoResponse timeB) {
        this.timeA = timeA;
        this.timeB = timeB;
    }

    public TimeDesempenhoResponse getTimeA() {
        return timeA;
    }

    public void setTimeA(TimeDesempenhoResponse timeA) {
        this.timeA = timeA;
    }

    public TimeDesempenhoResponse getTimeB() {
        return timeB;
    }

    public void setTimeB(TimeDesempenhoResponse timeB) {
        this.timeB = timeB;
    }
}

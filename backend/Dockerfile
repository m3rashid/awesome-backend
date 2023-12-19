FROM golang:1.21.5-alpine

RUN go install github.com/cosmtrek/air@latest

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

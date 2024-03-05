test:
	go test ./... -cover

run:
	air

build:
	rm -rf bin/main
	go build -o bin/main main.go

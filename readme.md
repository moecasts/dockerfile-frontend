# Frontend development environment

This is a frontend development environment created with docker.

## Inlcuding

- node.js 14.17
- npm 6.14
- yarn 1.22
- mysql 5.7

## Usage

```bash
git clone https://github.com/MoeCasts/dockerfile-frontend.git
cd dockerfile-frontend

docker compose up -d

# exec to react
docker compose exec --user=me -it react /bin/zsh
```

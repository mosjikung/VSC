# Quick start

Clone project and submodule

```bash
git clone --recurse-submodules -j8 git@ssh.zi-github.com:sustainable-city/microservice-vsc.git
```

Copy .env.example to .env and change credencial value

```bash
mv .env.example .env
```

Start stack

```bash
docker compose -f docker-compose.stack.yaml up -d
```

Start app and dev service

```bash
docker compose up

or

docker compose up -d

or

docker compose up <service name>
```

## Login our docker image registry

```bash
docker login registry.zi-github.com
```

## Default Goal

The default goal is set to `dev`.

## Commands

- `dev`: Starts the development environment.
- `prod`: Starts the production environment.
- `watch`: Watches the environment.
- `down`: Stops the stack.
- `build`: Builds the specified service.
- `push`: Pushes the specified service.

## Usage

```bash
make dev
make prod
make watch
make down
make build
make push
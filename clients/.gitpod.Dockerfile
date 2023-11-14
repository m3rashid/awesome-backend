FROM gitpod/workspace-full
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.1/zsh-in-docker.sh)" -- \
    -t https://github.com/denysdovhan/spaceship-prompt \
    -p git \
    -p https://github.com/zsh-users/zsh-syntax-highlighting

#!/usr/bin/env sh
# Bootstrap: fetch and run the real install script from the dotfiles repo
exec sh -c "$(curl -fsSL https://raw.githubusercontent.com/aktech/dotfiles/main/install.sh)"

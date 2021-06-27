# 前端开发中，时常需要使用 shell 命令，而有一个较为完整的环境比较重要，因此选择了使用 ubuntu 作为基础，若在意容器大小的话，可自行选择适用的基础镜像
FROM ubuntu
MAINTAINER Caster "moecasts.caster@gmail.com"

# 设置环境变量 
ENV DEBIAN_FRONTEND noninteractive

# 设置时区
ARG TZ=Asia/Shanghai
ENV TZ ${TZ}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 用 root 用户操作
USER root

# 更换阿里云源，在国内可以加快速度
RUN sed -i "s/security.ubuntu.com/mirrors.aliyun.com/" /etc/apt/sources.list && \
    sed -i "s/archive.ubuntu.com/mirrors.aliyun.com/" /etc/apt/sources.list && \
    sed -i "s/security-cdn.ubuntu.com/mirrors.aliyun.com/" /etc/apt/sources.list
RUN  apt-get clean

# 更新源，安装相应工具
RUN apt-get update && apt-get install -y \
    zsh \
    vim \
    wget \
    curl \
    python \
    git-core

#  安装 zsh，以后进入容器中时，更加方便地使用 shell
RUN git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh \
    && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
    && git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && sed -i 's/^plugins=(/plugins=(zsh-autosuggestions zsh-syntax-highlighting z /' ~/.zshrc \
    && chsh -s /bin/zsh

# 创建 me 用户
RUN useradd --create-home --no-log-init --shell /bin/zsh -G sudo me 
RUN adduser me sudo
RUN echo 'me:password' | chpasswd

# 为 me 安装 omz
USER me
RUN git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh \
    && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
    && git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && sed -i 's/^plugins=(/plugins=(zsh-autosuggestions zsh-syntax-highlighting z /' ~/.zshrc

# 安装 nvm 和 node
ENV NVM_DIR /home/me/.nvm
ENV NODE_VERSION v14
RUN mkdir -p $NVM_DIR && \
    curl -o- https://gitee.com/mirrors/nvm/raw/master/install.sh | bash \
        && . $NVM_DIR/nvm.sh \
        && nvm install ${NODE_VERSION} \
        && nvm use ${NODE_VERSION} \
        && nvm alias ${NODE_VERSION} \
        && ln -s `npm bin --global` /home/me/.node-bin \
        && npm install --global nrm \
        && nrm use taobao

USER me
RUN echo '' >> ~/.zshrc \
    && echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.zshrc

# 安装 yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash; \
    echo '' >> ~/.zshrc && \
    echo 'export PATH="$HOME/.yarn/bin:$PATH"' >> ~/.zshrc

# Add NVM binaries to root's .bashrc
USER root

RUN echo '' >> ~/.zshrc \
    && echo 'export NVM_DIR="/home/me/.nvm"' >> ~/.zshrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm' >> ~/.zshrc

USER root

RUN echo '' >> ~/.zshrc \
    && echo 'export YARN_DIR="/home/me/.yarn"' >> ~/.zshrc \
    && echo 'export PATH="$YARN_DIR/bin:$PATH"' >> ~/.zshrc

# Add PATH for node
ENV PATH $PATH:/home/me/.node-bin

# Add PATH for YARN
ENV PATH $PATH:/home/me/.yarn/bin

# 删除 apt/lists，可以减少最终镜像大小，详情见：https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#general-guidelines-and-recommendations
USER root
RUN rm -rf /var/lib/apt/lists/*

WORKDIR /var/www

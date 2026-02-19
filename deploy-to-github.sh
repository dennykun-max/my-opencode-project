#!/bin/bash

# GitHub自动化部署脚本
# 使用方法: ./deploy-to-github.sh <仓库名> <描述>

set -e

REPO_NAME="${1:-my-opencode-project}"
DESCRIPTION="${2:-Project created with OpenCode}"
GITHUB_USER="dennykun-max"

echo "🚀 开始部署到GitHub..."

# 检查是否已初始化Git
if [ ! -d ".git" ]; then
    echo "初始化Git仓库..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# 检查GitHub CLI是否安装
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI未安装"
    echo "请安装: winget install --id GitHub.cli"
    exit 1
fi

# 检查是否已登录
if ! gh auth status &> /dev/null; then
    echo "请先登录GitHub: gh auth login"
    exit 1
fi

# 创建GitHub仓库
echo "创建GitHub仓库: $REPO_NAME..."
gh repo create "$REPO_NAME" --public --description "$DESCRIPTION" --remote=origin --source=. --push

echo "✅ 部署完成!"
echo "仓库地址: https://github.com/$GITHUB_USER/$REPO_NAME"
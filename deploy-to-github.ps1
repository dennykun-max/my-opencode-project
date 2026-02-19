# PowerShell GitHub自动化部署脚本
# 使用方法: .\deploy-to-github.ps1 -RepoName "my-project" -Description "My project"

param(
    [string]$RepoName = "my-opencode-project",
    [string]$Description = "Project created with OpenCode"
)

$GithubUser = "dennykun-max"

Write-Host "🚀 开始部署到GitHub..." -ForegroundColor Green

# 检查是否已初始化Git
if (-not (Test-Path ".git")) {
    Write-Host "初始化Git仓库..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit"
}

# 检查GitHub CLI是否安装
try {
    $null = Get-Command gh -ErrorAction Stop
} catch {
    Write-Host "❌ GitHub CLI未安装" -ForegroundColor Red
    Write-Host "请安装: winget install --id GitHub.cli" -ForegroundColor Yellow
    exit 1
}

# 检查是否已登录
try {
    gh auth status 2>&1 | Out-Null
} catch {
    Write-Host "请先登录GitHub: gh auth login" -ForegroundColor Yellow
    exit 1
}

# 创建GitHub仓库
Write-Host "创建GitHub仓库: $RepoName..." -ForegroundColor Yellow
gh repo create $RepoName --public --description $Description --remote=origin --source=. --push

Write-Host "✅ 部署完成!" -ForegroundColor Green
Write-Host "仓库地址: https://github.com/$GithubUser/$RepoName" -ForegroundColor Cyan
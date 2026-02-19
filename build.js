// 简单的构建脚本 - 复制文件到dist目录
const fs = require('fs');
const path = require('path');

// 创建dist目录
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// 需要复制的文件
const filesToCopy = [
    'index.html',
    'style.css',
    'script.js',
    'README.md'
];

// 复制文件
filesToCopy.forEach(file => {
    const source = path.join(__dirname, file);
    const dest = path.join(distDir, file);
    
    if (fs.existsSync(source)) {
        fs.copyFileSync(source, dest);
        console.log(`✅ 已复制: ${file}`);
    } else {
        console.log(`⚠️  文件不存在: ${file}`);
    }
});

// 创建CNAME文件（用于自定义域名）
const cnameContent = 'my-opencode-project.pages.dev';
fs.writeFileSync(path.join(distDir, 'CNAME'), cnameContent);
console.log(`✅ 已创建: CNAME`);

console.log('\n🎉 构建完成！网站文件已准备好部署到 GitHub Pages。');
console.log('访问地址: https://dennykun-max.github.io/my-opencode-project/');
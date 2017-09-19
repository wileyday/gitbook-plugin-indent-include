"use strict";

const fs = require('fs');
const path = require('path');

module.exports = {
  hooks: {
    "page:before": function(page) {
      const dirPath = path.dirname(page.rawPath);
      process.chdir(dirPath);

      let lines = page.content.split("\n");

      // {% include .. %}가 발견되면 파일을 읽어 해당 라인에 replace 한다.
      for (let i = 0; i < lines.length; i++) {
        let result = lines[i].match(/(\s*)\{\%\s*?include\s*?"?(.+)"? \%\}/);
        if (!result) continue;
        if (result.length > 2) {
          lines[i] = include(result[1].length, result[2].replace(/\"/g, '').trim());
        }
      }

      page.content = lines.join("\n");

      return page;
    }
  }
};

// fileName의 파일의 읽어서 라인별로 spaces 만큼 공백을 왼쪽으로 채우고
// string을 리턴한다.
function include(spaces, fileName) {
  const originDir = process.cwd();
  const filePath = path.resolve(originDir, fileName);
  const dirPath = path.dirname(filePath);

  // 중첩 include 를 위해 작업 디렉토리를 변경해두자
  process.chdir(dirPath);

  const fileContent = fs.readFileSync(filePath).toString();
  const lines = fileContent.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let result = lines[i].match(/(\s*)\{\%\s*?include\s*?"?(.+)"? \%\}/);
    if (!result) {
      lines[i] = ' '.repeat(spaces) + lines[i];
    } else if (result.length > 2) {
      lines[i] = include(result[1].length + spaces, result[2].replace(/\"/g, '').trim());
    }
  }

  // 이전 디렉토리로 복귀
  process.chdir(originDir);

  return lines.join("\n");
}

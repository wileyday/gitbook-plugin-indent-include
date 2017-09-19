# gitbook-plugin-indent-include
파일의 내용을 include 명령 위치를 기준으로 들여쓰기 합니다.
리스트의 중복되는 내용을 외부 파일로 빼낼 때 유용합니다.

## 특징
* gitbook 의 기본 include 명령을 그대로 사용하여 기존 작성된 문서를 수정할 필요가 없습니다.
* include 된 파일 안에 include 명령을 사용하여도 잘 작동합니다.

## 사용법

```markdown
### Required Parameters

* `messages` - [Array] 형식의 메시지 발송 정보
  {% include "./fragments/to.md" %}
  {% include "./fragments/from.md" %}
  {% include "./fragments/text.md" %}

### Optional Parameters

* `messages` - [Array] 형식의 메시지 발송 정보
  {% include "./fragments/type.md" %}
  {% include "./fragments/country.md" %}
  {% include "./fragments/subject.md" %}
  {% include "./fragments/imageId.md" %}
  {% include "./fragments/scheduledDate.md" %}
  {% include "./fragments/kakaoOptions.md" %}
{% include "./fragments/groupOptions.md" %}

```

결과는 아래 링크의 페이지에서 확인 가능합니다.

https://docs.coolsms.co.kr/rest/simple-message.html#required-parameters

## 라이선스

MIT License

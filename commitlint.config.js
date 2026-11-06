export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 제목이 Select·Toast 같은 컴포넌트 이름으로 시작할 수 있다
    'subject-case': [0],
  },
}

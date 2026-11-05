# 인터랙션 가이드

> 모션·상태 전환·피드백 타이밍과 화면 요소의 열림·닫힘·검증·검색 동작을 정한다.
>
> 기본안이다. 서비스 성격에 맞게 고쳐 쓴다.

수치는 토큰으로 부른다. 컴포넌트 명세(`../components/<name>.md`)에 값이 있으면 명세를 따른다. 언어·프레임워크별 구현은 [design.md 14장](../design.md#14-환경별-적용)을 따른다. 이 문서의 "URL 쿼리"는 웹 기준이며, URL이 없는 환경에서는 화면 상태로 유지한다.

## 1. 모션 원칙

- 빠르고 절제되게 움직인다. 토큰 범위는 `duration-d1`–`duration-d6`이다.
- 나타날 때 `easing-enter`, 사라질 때 `easing-exit`, 제자리 변화는 `easing-easing`을 쓴다.
- 장식 애니메이션을 쓰지 않는다. 의미 있는 피드백에만 움직임을 쓴다.
- `prefers-reduced-motion`을 존중한다([accessibility.md 7장](accessibility.md#7-모션)).

## 2. 모션 토큰

| 상황 | duration | easing |
| --- | --- | --- |
| hover·색 전환 | `duration-color-transition` | `easing-easing` |
| 누름 축소 | `duration-pressed-scale` | `easing-pressed-scale` |
| 입력 필드 포커스 테두리 | `duration-d2` | `easing-easing` |
| [Toast](../components/toast.md) 등장 / 퇴장 | `duration-d3` / `duration-d2` | `easing-enter` / `easing-exit` |
| [Dropdown Menu](../components/dropdown-menu.md) 열기 / 닫기 | `duration-d3` / `duration-d2` | `easing-enter` / `easing-exit` |
| [Dialog](../components/dialog.md)·[Alert Dialog](../components/alert-dialog.md) 열기 / 닫기 | `duration-d4` / `duration-d2` | `easing-enter-expressive` / `easing-exit` |
| [Bottom Sheet](../components/bottom-sheet.md)·[Side Sheet](../components/side-sheet.md) | `duration-d6` | 명세 참조 |
| 페이지 전환 | `duration-d6` / `duration-d4` | `easing-enter` / `easing-exit` |

누름 축소 배율은 [design.md 8장](../design.md#8-모션)의 높이 기준으로 고른다.

## 3. 상태 전환

| 상태 | 동작 |
| --- | --- |
| Hover | 정밀 포인터에서만 배경·색을 바꾼다. 크기·회전 변형은 쓰지 않는다 |
| Pressed | `bg-*-pressed` 색과 누름 축소 |
| Focus-visible | 지연 없이 표시한다([design.md 11장](../design.md#11-포커스)) |
| Disabled | `bg-disabled` + `fg-disabled`, `cursor: not-allowed`, 전환 없음. 컴포넌트별 표현은 명세를 따른다 |

## 4. 로딩 피드백

| 상황 | 사용 |
| --- | --- |
| 콘텐츠 영역 로딩(목록·카드) | [Skeleton](../components/skeleton.md) |
| 버튼을 누른 뒤 처리 중 | [Button](../components/button.md) `loading` |
| 위치를 알 수 없는 로딩, 페이지 단위 로딩 | [Progress Circle](../components/progress-circle.md) `40`, 콘텐츠 영역 가운데 |

- 300ms 안에 끝나는 로딩에는 Skeleton을 띄우지 않아도 된다.
- 스피너는 400ms 안에 끝나는 작업에 띄우지 않는다. 300ms 지연 후 표시해 깜빡임을 막는다.
- 같은 화면에 스피너와 Skeleton을 함께 쓰지 않는다.

## 5. 피드백

| 표면 | 쓰는 자리 | 지속 |
| --- | --- | --- |
| [Toast](../components/toast.md) | 방금 한 행동의 결과 | 4000ms, Action이 있으면 6000ms. hover·포커스 중 정지 |
| [Callout](../components/callout.md) | 사라지면 안 되는 안내 | 사용자가 닫기 전까지 유지 |
| [Field](../components/field.md) 오류 | 특정 입력값 오류 | 값이 고쳐질 때까지 유지 |
| [Alert Dialog](../components/alert-dialog.md) | 진행 전 결정이 필요한 확인 | 버튼으로 닫을 때까지 유지 |

- Toast는 한 번에 하나만 보인다. 새 Toast가 오면 이전 것을 바로 교체한다.
- Toast의 variant는 `default`·`positive`·`critical`이다. 성공은 `positive`, 실패는 `critical`, 그 밖의 안내는 `default`를 쓴다.
- Toast Action은 Toast 없이도 할 수 있는 행동이어야 한다. 키보드·스크린리더 사용자가 놓칠 수 있다.

## 6. 모달 닫힘

폼을 담은 모달에서 실수로 입력이 사라지지 않게 한다. [Dialog](../components/dialog.md)의 `dismissible` 기본값은 true이며, 변경 여부로 동작이 갈린다. [Bottom Sheet](../components/bottom-sheet.md)·[Side Sheet](../components/side-sheet.md)도 같다.

| 상태 | Esc·Backdrop·끌어 내리기 | 취소·X |
| --- | --- | --- |
| 변경 없음 | 바로 닫는다 | 바로 닫는다. 토스트 없음 |
| 변경 있음 | [Alert Dialog](../components/alert-dialog.md)로 확인한 뒤 닫는다 | 바로 닫고 취소 토스트를 띄운다 |
| 제출 처리 중 | 막는다([7장](#7-제출-처리-중-잠금)) | 막는다 |

- 변경 여부는 처음 값과 현재 값의 비교로 판단한다.
- 저장·제출 성공으로 닫힐 때는 취소 토스트를 띄우지 않는다. 성공 피드백을 따로 준다.
- 토스트 문구는 [ux-writing.md 9장](ux-writing.md#9-토스트)을 따른다. 모달이 닫히면 토스트만 남으므로 대상을 생략하지 않는다.
- Alert Dialog는 Backdrop으로 닫히지 않는다. Esc는 취소와 같다.

## 7. 제출 처리 중 잠금

제출·저장이 진행 중이면 요청이 끝날 때까지 모달을 닫지 못하게 한다. 닫히면 요청 결과를 놓치고 부분 완료로 오해할 수 있다.

| 요소 | 진행 중 상태 |
| --- | --- |
| 누른 제출 버튼 | [Button](../components/button.md) `loading` — `aria-busy="true"`, 클릭·Enter·Space 무시, 포커스 유지 |
| 취소·닫기 버튼 | `disabled` |
| X·Esc·Backdrop | 모두 막는다 |

- 닫기 요청이 한 경로로 모이게 만들고 그 경로에서 막는다. 수단마다 따로 막지 않는다.
- 요청이 끝나면 잠금을 푼다. 성공이면 닫고 성공 피드백을 주고, 실패면 열어둔 채 오류를 보인다.
- `loading` 버튼의 라벨은 시각적으로 숨는다. 라벨이 숨어도 접근 가능한 이름은 유지한다.

## 8. 폼 제출 검증

제출·저장 버튼은 **항상 활성**이다. 필수값이 비어 있어도 비활성화하지 않는다. 비활성 버튼은 왜 누를 수 없는지 알려주지 못한다.

- 누르면 검증한다. 실패하면 첫 오류 필드로 포커스를 옮기고 필드 아래에 오류 문구를 보인다.
- 오류가 여러 개면 문서(탭) 순서상 첫 필드로 옮긴다.
- 첫 오류는 제출 시 보여준다. 이후 그 필드는 입력할 때마다 다시 검증해 오류가 풀리면 즉시 지운다. 입력 중인 빈 필드를 처음부터 오류로 표시하지 않는다([Field](../components/field.md)).
- 통과하면 제출을 진행한다. 제출 중 잠금은 [7장](#7-제출-처리-중-잠금)을 따른다. 이는 중복 제출 방지이며 검증용 비활성과 다르다.
- 접근성 세부는 [accessibility.md 4장](accessibility.md#4-스크린리더)을 따른다.

## 9. 폼 안 경고

필드 하나에 매이지 않는 경고는 필드 문구가 아니라 폼 안의 [Callout](../components/callout.md) `critical`로 보인다. 서버 검증으로 저장이 막힌 사유와, 저장 전에 화면이 미리 알아낸 등록 불가 사유가 여기 해당한다.

- **위치**: 폼 마지막, 제출 버튼 바로 위. 모달이면 닫지 않고 그 자리에 남긴다. 입력을 다시 채우게 하지 않는다.
- **읽기**: 나중에 나타나므로 `role="alert"`를 준다.
- **문구**: 막혔다는 사실에서 그치지 않고 다음에 할 일을 쓴다. 예: "이미 다른 팀에 등록된 회원입니다. 그 팀에서 먼저 삭제한 뒤 등록해주세요."
- **링크**: 조치할 곳이 다른 화면이면 Callout의 Link를 둔다. 아는 맥락(대상·기간 등)은 파라미터로 넘겨 그 상태로 열리게 한다.
- **정리**: 사유와 직결된 입력이 바뀌면 없앤다. 다시 제출할 때도 먼저 비운다.
- **한 사유에 하나**: 저장 전 예고와 저장 후 서버 응답이 같은 사유면 하나로 합친다.
- **경고가 아닌 것**: 등록은 되지만 설명이 필요한 정도는 Field의 Description으로 둔다.
- **일시적 실패**: 네트워크 끊김·5xx처럼 사용자가 조치할 수 없는 실패는 Toast로 둔다.

## 10. 페이지 이탈 경고

작성·수정 폼은 저장하지 않은 변경이 있으면 화면을 떠나기 전에 [Alert Dialog](../components/alert-dialog.md)로 확인한다. 제목 예: "저장하지 않고 나갈까요?"

- 조건은 "변경 있음"이고 저장이 끝나면 푼다. 저장·확인 모달이 열려 있는 동안에는 겹쳐 띄우지 않는다.
- 저장 버튼이 없는 즉시 반영형 화면(예: [Switch](../components/switch.md) 토글)은 대상이 아니다.

## 11. 목록 검색·필터

검색은 **사용자가 명시적으로 실행**한다.

- 예외: 값을 골라야 하는 선택 입력의 자동완성은 입력 중에 조회한다([Combobox async](../components/combobox.md)). 목록 조회가 아니라 보기를 찾는 동작이기 때문이다.
- 타이핑 중에는 조회하지 않는다. 입력값은 화면 안에만 두고 Enter(폼 제출) 또는 검색 버튼으로 확정한다.
- 확정한 값은 URL 쿼리에 남기고 페이지를 1로 되돌린다([Pagination](../components/pagination.md)).
- 지우기 버튼은 값이 있을 때만 보인다([Text Input](../components/text-input.md)). 목록 검색창에서 지우기는 명시적 초기화다. 입력을 비우고 즉시 전체 조회로 되돌리고 페이지를 1로 되돌린다. 포커스는 입력으로 돌아간다.
- [Select](../components/select.md) 선택, 기간 이동 버튼, [Chip](../components/chip.md) 탭은 한 번에 끝나는 명시적 행동이므로 바꾸는 즉시 조회한다. 이때 필터 줄에 검색 버튼을 따로 두지 않는다.

### 11.1 조건 시트

조건이 많으면 ≥ 768px은 [Side Sheet](../components/side-sheet.md), 그 미만은 [Bottom Sheet](../components/bottom-sheet.md)에 모은다.

- 칩이 한 조건을 한 번에 바꾸는 모델이라면 시트는 여러 조건을 모아 한 번 조회하는 모델이다. `조회`로 확정하고 시트를 닫는다.
- `초기화`는 시트의 입력값만 비운다. 조회하지 않는다.
- 조회 없이 닫으면 입력 중인 값을 버리고 적용된 조건은 그대로 둔다. 저장할 데이터가 아니므로 [6장](#6-모달-닫힘)의 확인을 거치지 않는다.
- 시트에서 건 조건은 필터 줄 아래에 지우기 아이콘이 있는 Chip으로 남기고 하나씩 해제할 수 있게 한다.

### 11.2 진입 기본값

데이터를 보고 정하는 기본값(예: 데이터가 있는 가장 최근 달)은 진입할 때 한 번만 정한다.

- 정한 값은 이력을 늘리지 않고 URL 쿼리에 남긴다. 새로고침해도 보던 값에 머문다.
- 쿼리로 들어오면 그 값이 우선이다.
- 기본값을 정하기 전에는 표를 그리지 않고 Skeleton을 보인다. 다른 값을 먼저 그렸다가 넘어가면 그 사이 연 수정 창이 엉뚱한 대상에 저장될 수 있다.

## 12. 제스처

- Bottom Sheet는 아래로 끌어 닫는다. Body가 맨 위일 때만 끌 수 있고, 스크롤 중에는 스크롤이 우선이다.
- 끌기·스와이프는 보조 수단이다. 같은 동작을 버튼으로도 할 수 있어야 한다.
- 당겨서 새로고침은 선택 사항이다.

## 13. 다단계 흐름

단계를 URL 쿼리로 표현하면 뒤로 가기를 아래 원칙으로 설계한다. 주문의 배송지 → 결제 → 완료가 예다.

- **되돌아갈 수 있는 단계만 이력에 쌓는다.** 확인 창·완료 화면 같은 이후 단계는 현재 이력을 교체한다.
- **제출 완료는 종결 상태다.** 되돌릴 수 없는 제출이 끝난 화면에서 뒤로 가면 방금 제출한 입력 단계로 돌아가지 않는다. 완료 화면으로 입력 단계 이력을 덮어써 첫 단계로 가게 한다.
- **뒤로 가면 남은 상태를 지운다.** 뒤로 가기는 URL만 되돌리므로 첫 단계로 돌아오면 이전 선택값을 명시적으로 초기화한다.
- **다시 진행은 명시적 행동으로만 한다.** 뒤로 가기로 다시 들어가게 두지 않는다.

## 14. 내비게이션 메뉴

하위 항목은 hover가 아니라 **클릭으로 펼친다**. hover는 터치 기기에서 동작하지 않고, 열림 지연 때문에 느리게 느껴진다.

- 페이지 이동 메뉴는 [Side Navigation](../components/side-navigation.md)·[Top Navigation](../components/top-navigation.md)으로 만든다. [Dropdown Menu](../components/dropdown-menu.md)는 행동 목록 전용이므로 페이지 이동에 쓰지 않는다.
- 하위 메뉴 토글은 `<button aria-expanded aria-controls>`이다.
- 전체를 `<nav aria-label="...">`로 감싼다. 현재 페이지는 `aria-current="page"`로 표시한다.

## 15. 전역 연결 상태

서버에 아예 도달하지 못하면 화면별 오류로는 전체가 막힌 상황을 알 수 없다. 이때는 화면 맨 위의 전역 안내 하나로 알린다.

- **트리거**: 네트워크 실패(단절·DNS 등 요청 자체의 실패)와 타임아웃 두 가지만. 인증 실패와 일반 4xx·5xx는 환경 문제로 오인하면 안 되므로 각 화면에서 처리한다.
- **표면**: [Connection Status Banner](../components/connection-status-banner.md)와 `다시 시도`. 화면 전체를 막는 오버레이는 쓰지 않는다.
- **모션**: 등장은 `duration-d4` + `easing-enter`.
- **유지**: 연결이 복구되거나 사용자가 닫을 때까지 남긴다.
- **로그인 화면**: 진입 자체가 막힌 상태이므로 폼 안에도 같은 원인 문구를 보인다. 아이디·비밀번호 오류와 구분한다.
- **환경 분기**: 컴포넌트는 하나로 두고 문구만 나눈다([ux-writing.md 10장](ux-writing.md#10-연결-상태-문구)).
- **자동 복구**: 온라인 전환 신호와 가벼운 상태 확인 요청으로 복구를 감지한다. 연결되면 안내를 자동으로 닫고 화면 데이터를 다시 불러온다. 수동 새로고침을 강요하지 않는다.

## 16. Do / Don't

- **Do** 모션 토큰만 쓴다.
- **Do** 나타날 때 `easing-enter`, 사라질 때 `easing-exit`를 쓴다.
- **Do** 변경이 있는 모달은 Esc·Backdrop으로 닫기 전에 확인한다.
- **Do** 제출 중에는 제출 버튼을 `loading`으로 두고 모든 닫기 수단을 막는다.
- **Do** 제출 버튼을 항상 활성으로 두고, 실패하면 첫 오류 필드로 포커스를 옮긴다.
- **Do** 서버 도달 불가는 전역 안내로 알리고 복구되면 자동으로 닫는다.
- **Don't** `duration-d6`(300ms)보다 긴 UI 전환을 쓰지 않는다. Skeleton·스피너의 반복 주기는 예외다.
- **Don't** 무한 반복 장식 애니메이션을 쓰지 않는다.
- **Don't** hover에 크기·회전 변형을 쓰지 않는다.
- **Don't** 필수값이 비었다고 제출 버튼을 비활성화하지 않는다.
- **Don't** 입력할 때마다 즉시 조회하지 않는다.
- **Don't** 네트워크 단절을 "오류가 발생했습니다"로 뭉뚱그리거나 비밀번호 오류와 같은 문구로 안내하지 않는다.
- **Don't** 서버 도달 불가에 화면 전체를 막는 오버레이를 띄우지 않는다.

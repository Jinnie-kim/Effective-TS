// 타입스크립트의 가장 중요한 역할은 "타입 시스템"에 있다.

// Item 6️⃣. 편집기를 사용하여 타입 시스템 탐색하기(5/8)
// 타입스크립트를 설치하면 다음 두 가지 실행
// 1. 타입스크립트 컴파일러 tsc
// 2. 단독으로 실행할 수 있는 타입스크립트 서버 tsserver - 언어 서비스 제공

// 특정 시점에 TS가 값의 타입을 어떻게 이해하고 있는지 살펴보는 것 -> 타입 넓히기, 좁히기 개념을 잡기 위해 꼭 필요한 과정

// 언어 서비스는 라이브러리와 라이브러리의 타입 선언을 탐색할 때 도움이 된다.
const response = fetch('http://example.com'); // declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;

// Item 7️⃣. 타입이 값들의 집합이라고 생각하기(5/8)
// 집합의 관점에서, 타입 체커의 주요 역할은 하나의 집합이 다른 집합의 부분 집합인지 검사하는 것

// 가장 작은 집합은 아무 값도 포함하지 않는 공집합이며, 타입스크립트에서는 never 타입이다.
// never 타입으로 선언된 변수의 범위는 공집합이기 때문에 아무런 값도 할당할 수 없다.

// 한 가지 값만 포함하는 타입, 리터럴literal 타입(유닛unit)

type A = 'A';
type B = 'B';

// 두 개 혹은 세 개 그 이상으로 묶으려면 유니온Union 타입
type AB = A | B;

const c: AB = 'C';

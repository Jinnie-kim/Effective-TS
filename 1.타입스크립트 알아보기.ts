// Item 1️⃣. 타입스크립트와 자바스크립트의 관계 이해하기(5/1)
// 타입 스크립트 타입 시스템은 자바스크립트의 런타임 동작을 '모델링'한다.

// 타입 시스템이 정적 타입의 정확성을 보장해줄 것 같지만 그렇지 않다.
// 애초에 타입 시스템은 그런 목적으로 만들어지지도 않았다.

// Item 2️⃣. 타입스크립트 설정 이해하기(5/2)

// noImplicitAny 변수들이 미리 정의된 타입을 가져야 하는지 여부를 제어
function add(a: number, b: number) {
  return a + b;
}

add(10, null);

// strictNullChecks
// noImplicitAny를 먼저 설정해야 한다.

const x: number = null; //  "strictNullChecks": false 인 경우 유효

const y: number = undefined; // null 대신 undefined를 써도 같은 에러가 남.

// null을 허용하지 않으려면 null 체크 코드나 단언문assertion을 추가해야 한다.

// 1. null 체크 코드

const el = document.getElementById('satus');
el.textContent = 'Ready';

if (el) {
  el.textContent = 'Ready';
}

// 단언문 assertion
el!.textContent = 'Ready';

// Item 3️⃣. 코드 생성과 타입이 관계없음을 이해하기 (5/2)
// 컴파일은 타입체크와 독립적으로 동작한다.

let z = 'hello';

z = 1234; // 타입 오류가 있지만 컴파일이 가능

// 런타임에는 타입 체크가 불가능하다.

// 타입 - 런타임 접근 불가
// 값 - 런타임 접근 가능

interface Square {
  width: number;
}

interface Rectangle extends Square {
  height: number;
}

type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  // instanceof 체크는 런타임에 일어난다.
  if (shape instanceof Rectangle) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}

// 런타임에 타입 정보를 유지하는 방법

// 1. height 속성이 존재하는 지 체크

function calculateArea2(shape: Shape) {
  if ('height' in shape) {
    shape; // Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Square
    return shape.width * shape.width;
  }
}

// 2. '태그'기법 - 런타임에 접근 가능한 타입 정보를 명시적으로 저장

// 3. 타입을 클래스로 만들기

class Square {
  constructor(public width: number) {}
}

class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}

type Shape2 = Square | Rectangle; // 여기서 Reactangle은 type으로 참조

function calculateArea3(shape: Shape) {
  // 여기서 Reactangle은 값으로 참조
  if (shape instanceof Rectangle) {
    shape;
    return shape.width * shape.height;
  } else {
    shape;
    return shape.width * shape.width;
  }
}

// 타입 연산은 런타임에 영향을 주지 않는다.

function asNumber(val: number | string): number {
  return val as number; // as number은 타입 연산이고 런타임 동작에는 아무런 영향을 미치지 않는다.
}

function asNumber2(val: number | string): number {
  return typeof val === 'string' ? Number(val) : val; // 런타임의 타입을 체크
}

// 타입스크립트 타입으로는 함수를 오버로드할 수 없다.

// 타입스크립트 타입은 런타임 성능에 영향을 주지 않는다.

// Item 4️⃣. 구조적 타이핑에 익숙해지기 (5/4)

// 덕 타이핑 duck typing : 객체가 어떤 타입에 부합하는 변수와 메서드를 가질 경우 객체를 해당 타입에 속하는 것으로 간주하는 방식.

interface Vetor2D {
  x: number;
  y: number;
}

function calculateLength(v: Vetor2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

interface NamedVector {
  name: string;
  x: number;
  y: number;
}

const v: NamedVector = { x: 3, y: 4, name: 'Zee' };

calculateLength(v); // 정상 number type의 x와 y가 있기 때문에 호출이 가능하다.

// 함수를 작성할 때, 호출에 사용되는 매개변수의 속성들이 매개변수의 타입에 선언된 속성만을 가질 거라 생각하기 쉽다.
// 타입은 열려'open'있다.

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

// v 는 어떤 속성이든 가질 수 있다.
// 정확한 타입으로 객체를 순회하는 것은 까다로운 문제이다.
function calculateLengthL1(v: Vector3D) {
  let length = 0;

  for (const axis of Object.keys(v)) {
    const coord = v[axis];

    length += Math.abs(coord);
  }

  return length;
}

// 루프보다는 모든 속성을 각각 더하는 구현이 더 낫다.
function calculatedLengthL2(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}

// Item 5️⃣. any 타입 지양하기 (5/6)
// 타입 시스템은 점진적이고 선택적이다.

// any 타입에는 안정성이 없다.
// any는 함수 시그니처를 무시해 버린다.

// any 타입에는 언어 서비스가 적용되지 않는다.
// 타입스크립트의 모토: 확장 가능한 자바스크립트
// 확장: 타입스크립트 경험의 핵심 요소인 '언어 서비스'
interface Person {
  firstName: string;
  last: string;
}

const formatName = (p: Person) => `${p.firstName} ${p.last}`;
const formatNameAny = (p: any) => `${p.first} ${p.last}`;

// any 타입은 코드 리팩토링 때 버그를 감춘다. -> 타입 체커를 통과해도 런타임에 오류가 발생함.
// any는 타입 설계를 감춘다.
// any는 타입시스템의 신뢰도를 떨어뜨린다.
// => any 타입을 사용하면 타입 체커와 타입스크립트 언어 서비스를 무력화시켜 버린다.

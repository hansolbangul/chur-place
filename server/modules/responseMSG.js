export async function response(data) {
  // 정상적인 response
  const msg = {
    result: true,
    message: null,
    data: data,
  };

  return msg;
}
export async function not_found() {
  // 404 not found
  const msg = {
    result: false,
    message: '데이터가 존재하지 않습니다.',
  };

  return msg;
}
export async function bad_response() {
  // 500 bad response
  const msg = {
    result: false,
    message: '요청이 잘못되었습니다.',
  };

  return msg;
}
export async function not_response(message) {
  // 500 bad response
  const msg = {
    result: false,
    message: message,
  };

  return msg;
}

function clientSizeScreen() {
  return document.documentElement.clientWidth;
}

function coefficientScreen() {
  const width = clientSizeScreen();
  if (width >= 1280) {
      return 3;
  } return 2;
}

export {clientSizeScreen, coefficientScreen};

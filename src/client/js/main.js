import '../scss/styles.scss';

const hello = async () => {
  const x = await fetch('');
  console.log('안녕 나는 웹팩이얌!');
};

hello();

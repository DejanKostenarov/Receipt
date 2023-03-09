let dataUrl =
  'https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1';

// Sort object into alphabetical order
function sortProductsAlphabetically(someData) {
  let dataForPrint = someData.sort((a, b) => a.name.localeCompare(b.name));
  return dataForPrint;
}

// Truncate string into 10 characters
function truncateDescription(data) {
  let trunced = data.slice(0, 10);
  return trunced;
}

// Counting products
function countProducts(data) {
  // domestic products
  let domesticCount = data.filter((x) => x.domestic);
  let printDomesticCount = domesticCount.length;
  // imported products
  let importedCount = data.filter((x) => !x.domestic);
  let printImportedCount = importedCount.length;
  // print to console
  console.log('Domestic count: ' + printDomesticCount);
  console.log('Imported count: ' + printImportedCount);
}

// Getting the sum for domestic and imported products
function sumProductCost(data) {
  let domesticCount = data.filter((x) => x.domestic);
  if (domesticCount.length > 1) {
    let sumDomesticProducts = domesticCount.reduce((a, b) => a.price + b.price);
    console.log('Domestic cost: $' + sumDomesticProducts);
  } else {
    console.log('Domestic cost: $' + domesticCount.price);
  }

  let importedCount = data.filter((x) => x.domestic === false);
  if (importedCount.length > 1) {
    let sumImportedProducts = importedCount.reduce((a, b) => a.price + b.price);
    console.log(sumImportedProducts);
  } else {
    importedCount.forEach((x) => console.log('Imported cost: $' + x.price));
  }
}

function printInfo(data) {
  console.log(
    `Product: ${data.name}\nPrice: $${data.price}\n${truncateDescription(
      data.description
    )}...\nWeight: ${!data.weight ? 'N/A' : data.weight + 'g'}`
  );
}

//get all domestic products
function domesticProducts(items) {
  console.log('Domestic');
  let sortedProducts = sortProductsAlphabetically(items);
  let printData = sortedProducts.forEach((x) => {
    if (x.domestic) {
      printInfo(x);
    }
  });
  return printData;
}

// get all imported products
function importedProducts(items) {
  console.log('Imported:');
  let sortedProducts = sortProductsAlphabetically(items);
  let printData = sortedProducts.forEach((x) => {
    if (!x.domestic) {
      printInfo(x);
    }
  });
  return printData;
}

function printProducts(dummyData) {
  domesticProducts(dummyData);
  importedProducts(dummyData);
}

// fetch data from url
async function getData() {
  let response = await fetch(dataUrl);
  let fetchData = await response.json();

  // print data to console
  printProducts(fetchData);
  truncateDescription(fetchData);
  sumProductCost(fetchData);
  countProducts(fetchData);
}

getData();

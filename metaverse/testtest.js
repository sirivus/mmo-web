async function asd() {
  //await page.goto('https://app.meliopayments.com/meliome/pay/metaverse');
  location.assign("https://app.meliopayments.com/meliome/pay/metaverse");

  const input = document.querySelector('input');
const log = document.getElementById('totalAmount').inputValue='1';
//log.value='1'
var el = document.querySelector("button.chakra-button.css1mri8yx.click()");
el.click();

input.addEventListener('input', updateValue);

function updateValue(e) {
  log.textContent = '1.00';
}

  // On mouse-over, execute myFunction
  function myFunction() {
    //document.querySelector('button');
    //document.getElementById("input-totalAmount").click();
    document.getElementById("input-totalAmount").click().fill.value = "1.00";
    document.addEventListener('click', event => {
      document.getElementById('totalAmount').click().fill.value = "1.00".innerText = '1.00';
    });
    //document.getElementById("input-totalAmount").textContent = "1.00";
  } myFunction();

/*<button type="button" class="chakra-button css-1mri8yx" data-testid="button-guests.register.buttonText">Pay metaverse</button>
*/
  function myFunc(totalAmount) {
    var s = document.getElementById(totalAmount);
    s.value = "1.00";
  }
  window.onload = function () {
    myFunc();
  };

  /*
    // Click [data-testid="input-totalAmount"]
await page.locator('[data-testid="input-totalAmount"]').click();
// Fill [data-testid="input-totalAmount"]
await page.locator('[data-testid="input-totalAmount"]').fill('1');
*/

  /*
    await page.goto('https://app.meliopayments.com/meliome/pay/metaverse');
  // Click [data-testid="input-totalAmount"]
  await page.locator('[data-testid="input-totalAmount"]').click();
  // Fill [data-testid="input-totalAmount"]
  await page.locator('[data-testid="input-totalAmount"]').fill('111');
  */

} asd()  
import puppeteer from "puppeteer";
import config from '../config/jestConfig';
import faker from 'faker';

faker.locale = "ru";

let page;
let browser;
beforeAll(async () => {
  browser = await puppeteer.launch(config.puppeteerConf);
  page = await browser.newPage();
  await page.setViewport({ width: config.width, height: config.height });
});

afterAll(() => {
  browser.close();
});

const currentTeamData = {
  teamName: '',
  teamCaptain: {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
  },
  player1: {
    name: '',
    lastName: '',
    email: '',
    age: '',
  },
  player2: {
    name: '',
    lastName: '',
    email: '',
    age: '',
  },
  player3: {
    name: '',
    lastName: '',
    email: '',
    age: '',
  },
  player4: {
    name: '',
    lastName: '',
    email: '',
    age: '',
  },
  player5: {
    name: '',
    lastName: '',
    email: '',
    age: '',
  }
};

const randomAge = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
const translit = () => {
      const
          rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
          eng = "shh sh ch cz yu ya yo zh `` y` e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g)
      ;
      return function(text, engToRus) {
        for(let x = 0; x < rus.length; x++) {
          text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
          text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
        }
        return text;
      }
};

const symb = ['_', '__', '', ''];

describe("Main", () => {
  test("Get data from vldf", async () => {
    await page.goto(config.appSourceURL);
    await page.waitForSelector(".team-view");

    currentTeamData.teamName = await page.evaluate(() =>
        document.querySelector('h1').textContent
    );

    await page.waitForSelector('.tturnir-btn:nth-child(2) .show_list');
    await page.click('.tturnir-btn:nth-child(2) .show_list');
    await page.waitForSelector('.profile-card');

    const captanFullName = await page.evaluate(() =>
        document.querySelector('.profile-card:nth-child(2) .p-name').textContent.replace(/^\s+|\s+$/g, '')
    );
    currentTeamData.teamCaptain.name = captanFullName.split(' ')[1];
    currentTeamData.teamCaptain.lastName = captanFullName.split(' ')[0];
    const captainEmail = faker.internet.email().split('@')[1];
    const validCaptainEmail = randomAge(1,500) + '@' + captainEmail;

    const rnd1 = randomAge(1, currentTeamData.teamCaptain.name.length - 1);
    const rnd3 = randomAge(1, currentTeamData.teamCaptain.lastName.length - 1);
    const rnd2 = () => symb[randomAge(0, symb.length - 1)];

    const nameForEmail = currentTeamData.teamCaptain.name.split('');
    nameForEmail.splice(rnd1, randomAge(0, 3), rnd2());
    const lastnameForEmail = currentTeamData.teamCaptain.lastName.split('');
    lastnameForEmail.splice(rnd3, randomAge(0, 3), rnd2());
    currentTeamData.teamCaptain.email = translit()(nameForEmail.join('') + lastnameForEmail.join('')) + validCaptainEmail;
    currentTeamData.teamCaptain.phone = '+7' + faker.phone.phoneNumberFormat(0);
    currentTeamData.teamCaptain.age = `${randomAge(17,30)}`;

    const player1FullName = await page.evaluate(() =>
        document.querySelector('.profile-card:nth-child(3) .p-name').textContent.replace(/^\s+|\s+$/g, '')
    );
    currentTeamData.player1.name = player1FullName.split(' ')[1];
    currentTeamData.player1.lastName = player1FullName.split(' ')[0];
    const player1Email = faker.internet.email().split('@')[1];
    const validplayer1Email = randomAge(1,500) + '@' +  player1Email;
    currentTeamData.player1.email = translit()(currentTeamData.player1.lastName) + validplayer1Email;
    currentTeamData.player1.age = `${randomAge(17,30)}`;

    const player2FullName = await page.evaluate(() =>
        document.querySelector('.profile-card:nth-child(4) .p-name').textContent.replace(/^\s+|\s+$/g, '')
    );
    currentTeamData.player2.name = player2FullName.split(' ')[1];
    currentTeamData.player2.lastName = player2FullName.split(' ')[0];
    const player2Email = faker.internet.email().split('@')[1];
    const validplayer2Email = randomAge(1,500) + '@' +  player2Email;

    currentTeamData.player2.email = translit()(currentTeamData.player2.lastName) + validplayer2Email;
    currentTeamData.player2.age = `${randomAge(17,30)}`;

    const player3FullName = await page.evaluate(() =>
        document.querySelector('.profile-card:nth-child(5) .p-name').textContent.replace(/^\s+|\s+$/g, '')
    );
    currentTeamData.player3.name = player3FullName.split(' ')[1];
    currentTeamData.player3.lastName = player3FullName.split(' ')[0];
    const player3Email = faker.internet.email().split('@')[1];
    const validplayer3Email = randomAge(1,500) + '@' +  player3Email;

    currentTeamData.player3.email = translit()(currentTeamData.player3.lastName) + validplayer3Email;
    currentTeamData.player3.age = `${randomAge(17,30)}`;

    const player4FullName = await page.evaluate(() =>
        document.querySelector('.profile-card:nth-child(6) .p-name').textContent.replace(/^\s+|\s+$/g, '')
    );
    currentTeamData.player4.name = player4FullName.split(' ')[1];
    currentTeamData.player4.lastName = player4FullName.split(' ')[0];
    const player4Email = faker.internet.email().split('@')[1];
    const validplayer4Email = randomAge(1,500) + '@' +  player4Email;

    currentTeamData.player4.email = translit()(currentTeamData.player4.lastName) + validplayer4Email;
    currentTeamData.player4.age = `${randomAge(17,30)}`;

    const player5FullName = await page.evaluate(() =>
        document.querySelector('.profile-card:nth-child(7) .p-name').textContent.replace(/^\s+|\s+$/g, '')
    );
    currentTeamData.player5.name = player5FullName.split(' ')[1];
    currentTeamData.player5.lastName = player5FullName.split(' ')[0];
    const player5Email = faker.internet.email().split('@')[1];
    const validplayer5Email = randomAge(1,500) + '@' +  player5Email;

    currentTeamData.player5.email = translit()(currentTeamData.player5.lastName) + validplayer5Email;
    currentTeamData.player5.age = `${randomAge(17,30)}`;
    console.log(currentTeamData);
  }, config.defaultTimeout);

  test("Add team", async () => {
    const { teamCaptain, teamName } = currentTeamData;
    await page.goto(config.appDefaultURl);

    await page.waitFor(500);

    await page.waitForSelector(".modal-entry__content__input input[type='email']");
    await page.click(".modal-entry__content__input input[type='email']");
    await page.type(".modal-entry__content__input input[type='email']", 'fyriq14@gmail.com');

    await page.waitForSelector(".modal-entry__content__input input[type='password']");
    await page.click(".modal-entry__content__input input[type='password']");
    await page.type(".modal-entry__content__input input[type='password']", 'kfcvrn36');

    await page.keyboard.press('Enter');
    await page.waitFor(500);
    await page.goto(config.appDefaultURlTeam);

    await page.waitForSelector("#name");

    await page.click("#first-name");
    await page.type("#first-name", teamCaptain.name);

    await page.click("#last-name");
    await page.type("#last-name", teamCaptain.lastName);

    await page.click("#telephone");
    await page.type("#telephone", teamCaptain.phone);

    await page.click("#email");
    await page.type("#email", teamCaptain.email);

    await page.click("#age");
    await page.type("#age", teamCaptain.age);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await page.click("#name");
    // await page.type("#name", teamName + ' Воронеж');
    await page.type("#name", teamName);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitFor(500);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitFor(500);
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    await page.waitForSelector(".btn-main_green");
    await page.click(".btn-main_green");

    // await page.waitFor(10000);
  }, config.defaultTimeout);

  test("Add players", async () => {
    const { player5, player4, player3, player2, player1 } = currentTeamData;
    await page.waitForSelector("a.btn-main");
    await page.click("a.btn-main");
    // await page.goto("https://www.kfcbattle.com/service-area/players/45430");

    await page.waitForSelector(".r-p-c-c-btns");
    await page.waitForSelector("a.btn-main");
    await page.click("a.btn-main");

    await page.waitForSelector("#first-name");
    await page.click("#first-name");
    await page.type("#first-name", player1.name);
    await page.click("#last-name");
    await page.type("#last-name", player1.lastName);
    await page.click("#email");
    await page.type("#email", player1.email);
    await page.click("#age");
    await page.type("#age", player1.age);
    await page.click("button.btn-main");

    await page.waitForSelector(".r-p-c-c-btns");
    await page.waitForSelector("a.btn-main");
    await page.click("a.btn-main");

    await page.waitForSelector("#first-name");
    await page.click("#first-name");
    await page.type("#first-name", player2.name);
    await page.click("#last-name");
    await page.type("#last-name", player2.lastName);
    await page.click("#email");
    await page.type("#email", player2.email);
    await page.click("#age");
    await page.type("#age", player2.age);
    await page.click("button.btn-main");

    await page.waitForSelector(".r-p-c-c-btns");
    await page.waitForSelector("a.btn-main");
    await page.click("a.btn-main");

    await page.waitForSelector("#first-name");
    await page.click("#first-name");
    await page.type("#first-name", player3.name);
    await page.click("#last-name");
    await page.type("#last-name", player3.lastName);
    await page.click("#email");
    await page.type("#email", player3.email);
    await page.click("#age");
    await page.type("#age", player3.age);
    await page.click("button.btn-main");

    await page.waitForSelector(".r-p-c-c-btns");
    await page.waitForSelector("a.btn-main");
    await page.click("a.btn-main");

    await page.waitForSelector("#first-name");
    await page.click("#first-name");
    await page.type("#first-name", player4.name);
    await page.click("#last-name");
    await page.type("#last-name", player4.lastName);
    await page.click("#email");
    await page.type("#email", player4.email);
    await page.click("#age");
    await page.type("#age", player4.age);
    await page.click("button.btn-main");

    await page.waitForSelector(".r-p-c-c-btns");
    await page.waitForSelector("a.btn-main");
    await page.click("a.btn-main");

    await page.waitForSelector("#first-name");
    await page.click("#first-name");
    await page.type("#first-name", player5.name);
    await page.click("#last-name");
    await page.type("#last-name", player5.lastName);
    await page.click("#email");
    await page.type("#email", player5.email);
    await page.click("#age");
    await page.type("#age", player5.age);
    await page.click("button.btn-main");

    await page.waitForSelector("a.btn-main");
  }, config.defaultTimeout);
});

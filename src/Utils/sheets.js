import { GoogleSpreadsheet } from "google-spreadsheet";

// Config variables
const SPREADSHEET_ID = '1DBnPUmH1l79fgBzt0dj1J0R6XvgPuK-01b06cCFV7qE';
const SHEET_ID = '0';
const CLIENT_EMAIL = 'weddingaccessopt@gsheetapi-1615979862681.iam.gserviceaccount.com';
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCbrsSjnHz+zMP8\n5D+E9dD9T80Io4Zqt6q2Xm1ZpeM46bgrd6oKl9aKORlhfHcRhs9XpaY3NNQi2/O7\nC53/PXX4I73Ky2v7mOR+hzu7SNTwOoGyuGv8xCtZKuhxz+EQyDFQEj6MITqsRfj7\nG5MV3jlPgJGiSEadtBSPoLJsBUEXIILWVi9epzOCU5kpAjy5L2PV6ibc9NhupHU+\n0xUyQgUOIR9TaNJkwyPpxBXrupq6kbhWidpZGut6Rxhp6web8ZicxW1BL9fePB5I\nt/SAjZHlbDuEBm1P5YBkb8Wz7N8Lna1eZX5xd8WgDsiycJbW6e0957k8p8cXfplp\ng7nxxwr7AgMBAAECggEAF+/IqzFJ5LFeJvl/LLXQ8sm8yCnAZpMjy9N78682Xw9M\ncl59RhCve2QpG1yUQB0erya4hj94qH1yHZ29Jrvv8f2o1k/to+sPosavL+4UU3Vj\ncLO7YstUsOqQf8NLIxXswxdzB3+qckd170H/nPqkjC1D9xQuy1ufV7AJDuPF7MSk\nw8JZa+zaWFgAyrburBTREdxCybXkU4SCzMgodSWwfSZECE+n/cOqZGb9fxmQnYlu\nAFZv2orRWaxMMGtC3/xlDqB+Jy0p+yLvlnOapNLWn3bWEYHTyzN7EYM6wO+FVBHH\n3UwVm0UyeyuLeyrK704Voa5qBaN3I9VF1q+5IDzaEQKBgQDautYLR32atVnS6mLi\nu2ksGWNyAhT7dIXxX3dYi49CG/kDmbJxLLyT3IP6AE7T3m75XoS9tfQCpn7KReFh\nOmiH/jzTSaX4tvodAwTKO6fK3ow3K5wl1MrjLPsaN5QvJm6lONw2/m06Lu0tmrpZ\ns36qXyVP+fN/kgcCRSP6geBJUQKBgQC2NcRgPnvDuzIR4mgvoIXsxcc1J3sKOg6A\nYm1ZgrUbqqIggy/mZbN09HUe2gd+yBBqMjNR41kDHBIJMnGnNo4OWExlSLbZMCbk\nNghMCPqSxb+svOwrr7ZLB477vOutbbk9fxrrXsxBoRIxhtrIQdd9qi5nySN1ykfS\ny6srUrx8iwKBgQCNqCsvquFB7Ol7m6jnRpDaqqapE4gbQl/s7vMQOXJSUmN3XXcf\nrOWErXAb3U8wEAK3Jeu6Ibkibkn3HkLVAUrpqFIkVLJU3cwmNepIP1JwJKmSoX/D\nUIkFkAAf/pbN4ooOH0EfrK942yNoQakmpwUFuhEkNrDokd5QLg8bEjn7wQKBgQCo\n0UgQo9OnlVjemRZOijuLE/NtnBazcvbcnFUUCbYi3AU6elF29eM/CP86hmdLX7FV\nsw05YZqm9ur++m2yrykOwWCGtsgykhp2dllZmTgPpIfiU2e9Uh9jhK1FL9Rr6q0l\n/Q3D5SD57XId0QQDZn1xQKueHQ1tpOzGsUz15sIb4QKBgBaJ74o0NRVPTU5wuQLQ\n+rONIsm99jI8omPmqv2OlyGDUluPd4fPgvNQydF0ecusqbw+TI2pvWcnX8UJysuz\nxLKIJm+Na3zLdNCDjt9QBPbetCFmnQ03UCX1yBUmBMUzQjmpBDO+C1F07UeWt0eX\nO96RDiCqIwxH5HynVDSRb4st\n-----END PRIVATE KEY-----\n";

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export const getSpreadsheet = async () => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    await sheet.loadCells('A1:M28');
    // console.log(sheet.getCell(0, 0));

    // row 1
    let farmLocation = [];
    for (let i = 0; i < 13; i++) {
      if (!sheet.getCell(1, i).value) {
        break;
      }
      farmLocation.push(sheet.getCell(1, i).value);
    }

    // row 5 - 11
    let fieldData = [];
    for (let r = 5; r < 11; r++) {
      let fieldNumArr = [];
      for (let i = 0; i < 13; i++) {
        if (!sheet.getCell(r, i).value) {
          break;
        }
        fieldNumArr.push(sheet.getCell(r, i).value);
      }
      fieldData.push(fieldNumArr);
    }

    // row 14 - 20
    let fieldNotes = [];
    for (let r = 14; r < 20; r++) {
      let fieldNumArr = [];
      for (let i = 0; i < 13; i++) {
        if (!sheet.getCell(r, i).value) {
          break;
        }
        fieldNumArr.push(sheet.getCell(r, i).value);
      }
      fieldNotes.push(fieldNumArr);
    }

    // row 23 - 28
    let fieldSensors = [];
    for (let r = 23; r < 28; r++) {
      let fieldNumArr = [];
      for (let i = 0; i < 13; i++) {
        if (!sheet.getCell(r, i).value) {
          break;
        }
        fieldNumArr.push(sheet.getCell(r, i).value);
      }
      fieldSensors.push(fieldNumArr);
    }

    // return obj
    return {
      farmLocation,
      fieldData,
      fieldNotes,
      fieldSensors
    };
  } catch (e) {
    console.error('Error: ', e);
  }
};
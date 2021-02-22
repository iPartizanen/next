// Core
import { put, call, delay } from 'redux-saga/effects';

// Instruments
import { catsActions } from '../../actions';
import { verifyEnvironment } from "../../../../helpers/verifyEnvironment";
import { developmentLogger, clientLogger } from "../../../../helpers/logger";

export function* loadCats () {
  const {
    isDevelopment,
    isProduction
  } = verifyEnvironment();

  const url = 'https://cat-fact.herokuapp.com/facts';
  let status = null;

  try {
    if (isDevelopment) {
      developmentLogger.info(`API GET request to ${url} was started...`);
    }

    yield put(catsActions.startLoading());

    const response = yield call(fetch, url);
    status = response.status;

    const results = yield call([response, response.json]);

    if (status !== 200) {
      if (isDevelopment) {
        developmentLogger.warn({
          message: `Current status code is: ${status}`
        });
      }

      if (isProduction) {
        clientLogger.warn({
          url,
          method: 'GET',
          status,
          message: response.statusText,
        });
      }
    } else {
      if (isDevelopment) {
        developmentLogger.info(`API GET request to ${url} has finished with status ${status}`);
      };

      if (isProduction) {
        clientLogger.info({
          url,
          method: 'GET',
          status,
          message: response.statusText,
        });
      }
    }

    yield put(catsActions.fillCats(results));
  } catch (error) {
    if (isDevelopment) {
      developmentLogger.warn({
        message: `Current status code is: ${status}`
      });
    }

    if (isProduction) {
      clientLogger.warn({
        url,
        method: 'GET',
        status,
        message: `API Error`
      });
    }
  } finally {
    yield put(catsActions.stopLoading());
  }
}
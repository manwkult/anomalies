import App from '@/app';
import IndexRoute from '@routes/index.route';
import AnomaliesRoute from '@/routes/anomalies.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new AnomaliesRoute()]);

app.listen();

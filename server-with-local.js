/** servicios uando un json local, esto lo realice solo para demostrar
 *  ejemplo como se inyectan las dependencias segun del modelo de servicio
 * que se llaman de diferentes maneras usando distintos origenes de los datos */
import { createApp } from './index.js';
import { services } from './services-models/local/services.js';

createApp(services);

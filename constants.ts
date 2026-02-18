
import { DocLink, QuizQuestion, VideoMetadata } from './types';

export const DOC_LINKS: DocLink[] = [
  {
    title: "Centro de Desarrolladores (Oficial)",
    url: "https://developer.salesforce.com/devcenter/marketing-cloud",
    description: "Punto de entrada oficial para desarrolladores. Herramientas, SDKs y documentación técnica.",
    iconType: 'official'
  },
  {
    title: "Documentación general de Marketing Cloud Engagement",
    url: "https://developer.salesforce.com/docs/marketing/marketing-cloud",
    description: "Guía completa sobre las capacidades y configuración de la plataforma.",
    iconType: 'guide'
  },
  {
    title: "Guía “Get Started” – Marketing Cloud APIs",
    url: "https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/get-started-index",
    description: "Primeros pasos para integrar y utilizar las APIs de Salesforce.",
    iconType: 'api'
  },
  {
    title: "Referencia API REST",
    url: "https://developer.salesforce.com/docs/marketing/marketing-cloud/references/mc_rest_summary/summary.html",
    description: "Documentación detallada sobre los endpoints REST para mensajería y activos.",
    iconType: 'code'
  },
  {
    title: "Referencia API SOAP",
    url: "https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/wsdl-endpoint-links.html?utm_",
    description: "Uso de la API SOAP para gestión de suscriptores y estructuras de datos complejas.",
    iconType: 'code'
  },
  {
    title: "AMPscript – Documentación oficial",
    url: "https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ampscript.html",
    description: "Referencia completa del lenguaje de scripting para personalización de contenidos.",
    iconType: 'learning'
  },
  {
    title: "Server-Side JavaScript (SSJS)",
    url: "https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_serverSideJavaScript.html",
    description: "Guía de uso de JavaScript en el lado del servidor dentro de Marketing Cloud.",
    iconType: 'code'
  },
  {
    title: "Trailhead – Formación oficial",
    url: "https://trailhead.salesforce.com",
    description: "Módulos de aprendizaje guiados y gamificados para todos los niveles.",
    iconType: 'learning'
  },
  {
    title: "Marketing Cloud en Salesforce Help",
    url: "https://help.salesforce.com/s/products/marketing-cloud",
    description: "Documentación funcional y de ayuda para el usuario final.",
    iconType: 'help'
  }
];

export const SQL_RESOURCES: DocLink[] = [
  {
    title: "SQL Reference for MC",
    url: "https://help.salesforce.com/s/articleView?id=sf.mc_as_sql_reference.htm&type=5",
    description: "Referencia de funciones y sintaxis soportada."
  },
  {
    title: "Data Views Reference",
    url: "https://help.salesforce.com/s/articleView?id=sf.mc_as_data_views.htm&type=5",
    description: "Tablas de sistema (_Click, _Open, _Job) para seguimiento."
  },
  {
    title: "Formación UCO SQL",
    url: "https://university.emeal.nttdata.com/enrol/index.php?id=10518",
    description: "Curso especializado en SQL para la universidad corporativa."
  },
  {
    title: "Formación SQL Interna ExO",
    url: "https://everisgroup.sharepoint.com/:f:/s/MARKETINGDIGITAL/IgCdvRPZhDgsTocGIANf5kqtAdwe3F5UP9_8uG8vWuysiT8?e=PaClbY",
    description: "Recursos internos y documentación técnica sobre SQL avanzado."
  }
];

export const SQL_EXERCISES = [
  {
    id: 1,
    level: "Básico",
    title: "Selección Simple",
    task: "Selecciona el Email y el Nombre de la tabla 'Customers' donde el país sea 'Spain'.",
    hint: "Usa SELECT, FROM y WHERE."
  },
  {
    id: 2,
    level: "Medio",
    title: "Filtrado por Fecha",
    task: "Obtén todos los campos de 'Subscribers' que se hayan unido después del 1 de enero de 2024.",
    hint: "Recuerda que las fechas en MC suelen compararse como strings o con funciones de fecha."
  },
  {
    id: 3,
    level: "Avanzado",
    title: "Ordenación y Límites",
    task: "Selecciona los 10 registros más recientes de 'Orders' ordenados por 'OrderDate' de forma descendente.",
    hint: "Usa SELECT TOP 10 y ORDER BY ... DESC."
  },
  {
    id: 4,
    level: "Experto",
    title: "Relación de Tablas (JOIN)",
    task: "Une la tabla 'Customers' (C) con 'Purchases' (P) usando 'SubscriberKey'. Selecciona el Nombre del cliente y el Monto de la compra.",
    hint: "Usa INNER JOIN C ON C.SubscriberKey = P.SubscriberKey."
  },
  {
    id: 5,
    level: "Maestro",
    title: "Agregación y Grupos",
    task: "Cuenta cuántos suscriptores hay por cada 'City' en la tabla 'Subscribers' y muestra solo las ciudades con más de 5 suscriptores.",
    hint: "Usa COUNT(*), GROUP BY y HAVING."
  },
  {
    id: 6,
    level: "Intermedio",
    title: "Seguimiento de Clics (Data Views)",
    task: "Selecciona el EmailAddress de la tabla de sistema _Subscribers y la fecha de clic de la tabla _Click filtrando por el JobID 12345.",
    hint: "Haz un JOIN entre _Subscribers y _Click usando el campo SubscriberID."
  },
  {
    id: 7,
    level: "Avanzado",
    title: "Exclusión: Enviados No Abiertos",
    task: "Encuentra el SubscriberKey de todos los usuarios que recibieron un envío (_Sent) pero que no tienen ningún registro en la tabla de aperturas (_Open).",
    hint: "Usa un LEFT JOIN entre _Sent y _Open, y filtra donde el ID de la tabla _Open sea NULL."
  },
  {
    id: 8,
    level: "Experto",
    title: "Actividad Reciente (Funciones de Fecha)",
    task: "Cuenta cuántos clics ha realizado cada usuario en los últimos 7 días usando la tabla de sistema _Click.",
    hint: "Filtra el campo EventDate comparándolo con GETDATE() usando DATEADD."
  },
  {
    id: 9,
    level: "Maestro",
    title: "Rendimiento por Campaña",
    task: "Muestra el EmailName de la tabla _Job y el número total de clics únicos por cada correo realizado.",
    hint: "Une _Job con _Click y utiliza COUNT(DISTINCT SubscriberKey) para obtener clics únicos."
  },
  {
    id: 10,
    level: "Ninja SQL",
    title: "Deduplicación de Registros",
    task: "Selecciona solo el registro más reciente de cada usuario de la tabla 'Staging_Data' basándote en el campo 'ImportDate'.",
    hint: "Usa ROW_NUMBER() OVER (PARTITION BY Email ORDER BY ImportDate DESC) y selecciona solo los registros con valor 1."
  }
];

export const VIDEOS_DATA: VideoMetadata[] = [
  { id: 1, title: "1. Configuraciones básicas", description: "Introducción a SFMC, unidades de negocio, roles y configuración de cuenta.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQC8yyF2X2i7RLaaKwMPeG7SAT10JcUyUCZ6YC3xDSoGS-U?e=YMpc55" },
  { id: 2, title: "2. Segmentación (Parte 1)", description: "Uso de Data Extensions y segmentación inicial.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQDtpC5FERUCQbIQXINN9u7BAbXXJC6DdR0O926CU8JxkAU?e=6odNtL" },
  { id: 3, title: "2. Segmentación (Parte 2)", description: "Filtros y relaciones avanzadas.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQCpJDZh_8zFTbo44LtnM337ASLVq7bhQ4DDIglUcnfrMqI?e=RiMMOD" },
  { id: 4, title: "3. SQL", description: "Consultas SQL en Automation Studio, joins y transformaciones de datos.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQABRe4a6sRcQbYDityqos3JAXLYU_gk2h9OD7Wmqc9e4lw?e=wcUTwy" },
  { id: 5, title: "4. Creación de campañas", description: "Tipos de campañas y flujo de trabajo para preparar envíos.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQCfCtRWZiJaQben9ImMQsevAVB3q2Ompi-XU4h5Tghitjg?e=M8PhKT" },
  { id: 6, title: "5. Automation Studio", description: "Creación de automatizaciones y actividades.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQB26i8rkDJbSInMmdNfUSjuAQThgCLBSJu8EC8br3Acgj8?e=jWTy8E" },
  { id: 7, title: "6. Envío de campañas", description: "Procesos de envío y validaciones.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQCK5KO-BaXfRKiRs52BiRlfAasULGjIPCm2SfrFVzfnkz8?e=hzkeWW" },
  { id: 8, title: "7. Personalización", description: "Uso de AMPscript y contenido dinámico.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQBYysxHuvqUS4g2t1goT69WAR1LHNqdlrTZ554aQX8HM2c?e=Nkye1r" },
  { id: 9, title: "8. Tracking", description: "Métricas de envío: aperturas, clics y rebotes.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQB8_ta2d_w9Qq5Fu3JQUWIlAZPAn7RD4m4TH9QFpUW4DyI?e=BDrguf" },
  { id: 10, title: "9. Reporting", description: "Creación de informes personalizados.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQAyvJtE0JZ7Qqge2lYumXprAXZj1tsVAxwl05L0VYKepj0?e=lLAiVc" },
  { id: 11, title: "10. Integraciones", description: "Conexión con Salesforce CRM y APIs.", url: "https://everisgroup.sharepoint.com/:v:/s/FormacinMKT/IQDAuqWNYvl0RKwBGNPdZvkcATEWQZzw5m1cy2NOFa86Y6w?e=TEZPov" }
];

export const QUIZZES: Record<string, QuizQuestion[]> = {
  GENERAL: [
    { id: 1, question: "¿Qué significa DE en Marketing Cloud?", options: ["Data Extension", "Digital Email", "Data Entry", "Detailed Engine"], correctAnswer: 0 },
    { id: 2, question: "¿Cuál es el lenguaje para contenido dinámico?", options: ["JS", "SQL", "AMPscript", "Python"], correctAnswer: 2 },
    { id: 3, question: "¿Dónde se crean flujos automatizados?", options: ["Email Studio", "Journey Builder", "Contact Builder", "Content Builder"], correctAnswer: 1 },
    { id: 4, question: "Identificador único de un contacto:", options: ["Email", "Subscriber Key", "Name", "ID"], correctAnswer: 1 },
    { id: 5, question: "Estudio para gestionar listas:", options: ["Email Studio", "Interaction Studio", "Social Studio", "Web Studio"], correctAnswer: 0 },
    { id: 6, question: "¿Qué herramienta permite enviar un SMS?", options: ["Email Studio", "Mobile Studio", "Advertising Studio", "Interaction Studio"], correctAnswer: 1 },
    { id: 7, question: "¿Para qué sirve el 'All Subscribers'?", options: ["Master List", "Blacklist", "Trash", "Template Folder"], correctAnswer: 0 },
    { id: 8, question: "¿Qué es un 'Data Extension'?", options: ["Carpeta", "Tabla de datos", "Imagen", "Script"], correctAnswer: 1 },
    { id: 9, question: "¿Qué hace el 'Decision Split'?", options: ["Divide por azar", "Divide por lógica de datos", "Envía email", "Espera tiempo"], correctAnswer: 1 },
    { id: 10, question: "¿MimeType por defecto para imágenes?", options: ["text/html", "image/png", "application/json", "audio/mp3"], correctAnswer: 1 }
  ],
  SQL: [
    { id: 1, question: "¿Qué comando extrae datos?", options: ["EXTRACT", "SELECT", "GET", "FETCH"], correctAnswer: 1 },
    { id: 2, question: "¿Dónde se ejecutan las queries?", options: ["Journey Builder", "Automation Studio", "Email Studio", "Analytics Builder"], correctAnswer: 1 },
    { id: 3, question: "Join que devuelve solo coincidencias:", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"], correctAnswer: 0 },
    { id: 4, question: "¿Para qué sirve WHERE?", options: ["Ordenar", "Filtrar", "Agrupar", "Contar"], correctAnswer: 1 },
    { id: 5, question: "Qué hace GROUP BY?", options: ["Agrupa registros", "Suma todos", "Borra duplicados", "Ordena"], correctAnswer: 0 }
  ]
};

export const EMAIL_EXERCISES = [
  {
    id: 1,
    title: "Email 1",
    docUrl: "https://everisgroup.sharepoint.com/:f:/s/FormacinMKT/IgCPxJez396aTJFKl8s8PJVMAeBqo7eUu6XhmjUnyq0Y1gY?e=KnSFSC",
    description: "Configuración inicial de email con subíndices y redirección dinámica."
  },
  {
    id: 2,
    title: "Email 2",
    docUrl: "https://everisgroup.sharepoint.com/:f:/s/FormacinMKT/IgC_XagKgxbdQ5V3lWN7HtPWAehwjiAxrIC8oGD2hSvP0k4?e=ZWLxAD",
    description: "Email avanzado con enlaces trackeables e imágenes vinculadas."
  }
];

export const EMAIL_EXERCISE_TEMPLATE = "https://everisgroup.sharepoint.com/:w:/s/FormacinMKT/IQC-XBAx2mZjTZ_K5yU7zNdVAcdhqbSORhKCARuLhFNOoFQ?e=eNP3tq";

export const JOURNEY_EXERCISES_TEXT = {
  JOURNEY_1: {
    title: "Ejercicio 1: Crear Journey 1 - Segmentar por quién es el cliente",
    content: [
      "Crear una carpeta con tu nombre, donde guardarás todos los Journeys que hagas.",
      "El cliente quiere utilizar la DE creada en el apartardo anterior, y que solo se lance una vez el Journey.",
      "Quiere enviar dos emails. Uno de ellos, el Email 1, quiere que lo reciban los registros que viven en España y el Email 2 quieren que lo reciban los registros que no viven en España."
    ],
    ref: "Source: Data Extension -> Decision Split (Path ES: Email -> Exit) (Path Not ES: Email -> Exit). Schedule: Run Once / Start On Activation."
  },
  JOURNEY_2: {
    title: "Ejercicio 2: Crear el Journey 2 - Segmentar por quién es",
    content: [
      "Queremos utilizar el Journey anterior (podemos o crear una nueva versión, o duplicar el Journey).",
      "Una vez segmentado por el país en el que viven, queremos esperar unos 5-10 min.",
      "A los registros que les ha llegado el Email 1 (España), segmentarlos por género: a los hombres que les llegue el Email 2 y a las mujeres el Email 3.",
      "Los clientes que han recibido el Email 2 (Fuera de España), queremos enviarles el Email 1."
    ],
    ref: "Source: Data Extension -> Decision Split (Country: ES) -> Path ES: Email 1 -> Wait (5-10m) -> Decision Split (Gender: M/F) -> Emails 2/3. Path Not ES: Email 2 -> Wait (5-10m) -> Email 1."
  },
  JOURNEY_3: {
    title: "Ejercicio 3: Crear el Journey 3 - Segmentar por qué se hace",
    content: [
      "Queremos utilizar el Journey 1 otra vez (nueva versión o duplicado).",
      "A los registros que se les enviará el Email 2 los dejamos como están.",
      "En el camino del Email 1, detectar qué personas han pulsado el botón para enviarles el Email 3 tras 10 minutos."
    ],
    ref: "Source: Data Extension -> Decision Split (Country: ES) -> Path ES: Email 1 -> Wait 10m -> Engagement Split (Click) -> Path Click Yes: Wait 10m -> Email 3. Path Click No: Exit. Path Not ES: Email 2 -> Exit."
  },
  JOURNEY_4: {
    title: "Ejercicio 4: Aprender a hacer test A/B",
    content: [
      "Queremos utilizar la DE de clientes de los ejercicios anteriores. En la configuración del Journey, debemos permitir que los contactos puedan volver a entrar una vez hayan salido.",
      "Antes de empezar, queremos hacer una segmentación inicial solo los registros que tengan el campo 'Suscrito' como 'True' continuarán en el Journey; el resto deberá salir directamente.",
      "A continuación, realizaremos un test A/B. Dividiremos a la audiencia en dos grupos: un 50% irá por el 'Camino A' y el otro 50% por el 'Camino B'.",
      "En el Camino A, enviaremos el Email 1. En el Camino B, enviaremos el Email 2.",
      "Tras el envío, pondremos una espera de 10 minutos en ambos caminos. Pasado ese tiempo, verificaremos qué contactos han hecho clic en cualquier enlace de los emails.",
      "A los que sí han hecho clic: Les enviaremos el Email 3 y utilizaremos la actividad Update Contact para que el campo 'Interés' de nuestra DE cambie a 'Alto'.",
      "A los que no han hecho clic, el Journey terminará para ellos."
    ],
    ref: "Settings: Re-entry after exiting -> Source: DE -> Decision Split (Suscrito=True) -> Yes Path: A/B Test (50% Path A, 50% Path B) -> Path A: Email 1 -> Wait 10m -> Engagement Split (Click) -> Yes: Email 3 -> Update Contact (Interés=Alto). Path B: Email 2 -> Wait 10m -> Engagement Split (Click) -> Yes: Email 3 -> Update Contact (Interés=Alto)."
  },
  JOURNEY_5: {
    title: "Ejercicio 5: Evento Entrada API",
    content: [
      "Crea una nueva DE llamada DE_API_Event_Journey con las columnas: Subscriber Key (PK, Text), Email (Email), Nombre (Text), País (Text), Evento (Text), FechaEvento (Date), Origen (Text).",
      "Configura el Journey con entrada de eventos de API: Event Definition Name: API_Event_Formulario, Contact Key: SubscriberKey, Data Extension: DE_API_Event_Journey.",
      "Permite re-entry de contactos.",
      "Envía Email 1 inmediatamente al entrar al Journey.",
      "Añade una espera de 5 minutos.",
      "Posteriormente dividir y segmentar por país: si el país es España se enviará el Email 2, en caso contrario el Email 3."
    ],
    ref: "Source: API Event -> Email 1 -> Wait 5m -> Decision Split (Country: ES) -> Path ES: Email 2. Path Not ES: Email 3."
  },
  JOURNEY_6: {
    title: "Ejercicio 6: Evento Entrada Automation",
    content: [
      "Crea una nueva DE llamada DE_Automation_Event_Journey con las columnas: Subscriber Key (PK, Text), Email (Email), Nombre (Text), País (Text), Evento (Text), FechaEvento (Date), Origen (Text), Interés (Text).",
      "Selecciona como entrada Automation Event (Automation Studio Event) configurando: Automation Name: Automation_Event_Formulario, Contact Key: SubscriberKey, Data Extension: DE_Automation_Event_Journey.",
      "Permite re-entry de contactos.",
      "Realiza un test A/B (50% Camino A, 50% Camino B).",
      "Camino A: Enviar Email 1. Camino B: Enviar Email 2.",
      "Espera de 10 minutos en ambos caminos.",
      "Verificar qué contactos han abierto cualquiera de los emails.",
      "A los que sí han abierto: Enviar Email 3 y dividir según si han hecho clic o no en el Email 3.",
      "Si hicieron clic: Actualizar campo en la DE (Interés = Alto). Si no hicieron clic: Finalizar el journey."
    ],
    ref: "Source: Automation Event -> A/B Test (50/50) -> Path A: Email 1 -> Wait 10m -> Engagement Split (Open) -> Yes: Email 3 -> Engagement Split (Click) -> Yes: Update Contact. Path B: Email 2 -> Wait 10m -> Engagement Split (Open) -> Yes: Email 3 -> Engagement Split (Click) -> Yes: Update Contact."
  }
};

export const REPORTING_EXERCISES_TEXT = {
  REPORTING_1: {
    title: "EJERCICIO 1: Reporting desde la Interfaz de Marketing Cloud",
    content: [
      "Parte 1: Tracking de envíos (Email Studio) - Identifica métricas de Emails enviados, entregados, rebotes (hard + soft), ratio de apertura, ratio de clic y bajas.",
      "Parte 2: Tracking por enlace (Click Performance) - Identifica los enlaces más clicados, número de clics únicos y CTR por enlace.",
      "Parte 3: Tracking por suscriptor - Busca un suscriptor concreto y revisa su historial de envíos, aperturas, clics y bajas."
    ]
  },
  REPORTING_2: {
    title: "EJERCICIO 2: Reporting avanzado con SQL (Data Views)",
    content: [
      "Parte 1: Métricas básicas por envío - Crear una query que obtenga métricas agregadas por JobID (usando _Sent, _Open, _Click, etc.).",
      "Parte 2: Engagement por suscriptor - Crear una query para identificar el nivel de interacción (aperturas totales, clics totales) de cada suscriptor.",
      "Parte 3: Reporte de un journey - Crear una query para identificar a nivel de journey las métricas de cada actividad de mail (usando _Journey y _JourneyActivity)."
    ]
  }
};

export const LANDING_EXERCISES = [
  {
    id: 1,
    title: "Landing 1",
    docUrl: "https://everisgroup.sharepoint.com/:f:/s/FormacinMKT/IgBzE4-9EPrNRI3X5me-zr03Ac-M4hllp0EzHYWNjYsL4NM?e=Rixauw",
    description: "Creación de una Landing Page básica con formulario de captación."
  },
  {
    id: 2,
    title: "Landing 2",
    docUrl: "https://everisgroup.sharepoint.com/:f:/s/FormacinMKT/IgBunS-jLRmOQoYAsYDQLxe7ATWh0FBkatPsaIel45ToKW8?e=OMa2xd",
    description: "Cloud Page avanzada con personalización mediante AMPscript según parámetros de URL."
  },
  {
    id: 3,
    title: "Landing 3",
    docUrl: "https://everisgroup.sharepoint.com/:f:/s/FormacinMKT/IgCSZZvCEKQYSp7bh6baVhEhAcFO4TX-WfhRXqKVB8jeaG0?e=lH1eAT",
    description: "Página de agradecimiento con lógica de validación de datos y redirección."
  }
];

export const LANDING_TEMPLATE = "https://everisgroup.sharepoint.com/:w:/s/FormacinMKT/IQBf3FmCOHnWRIDT3--MkQ1UAQt5KjX2EL_gJDmNLsbLRvk?e=Wa357v";

export const EMAIL_1_CORRECT_HTML = `...`;
export const EMAIL_2_CORRECT_HTML = `...`;

export const LANDING_1_CORRECT_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <style>
  /* ================= FUENTES BBVA ================= */
  @font-face {
    font-family: 'BentonSansBook';
    src: url('https://edicion-kbaqszd2.openweb.bbva/wp-content/themes/principal-openweb/fonts/bentonsans_book.woff2') format('woff2');
  }
  @font-face {
    font-family: 'BentonSansMedium';
    src: url('https://edicion-kbaqszd2.openweb.bbva/wp-content/themes/principal-openweb/fonts/bentonsans_medium.woff2') format('woff2');
  }
  @font-face {
    font-family: 'BentonSansBold';
    src: url('https://edicion-kbaqszd2.openweb.bbva/wp-content/themes/principal-openweb/fonts/bentonsans_bold.woff2') format('woff2');
  }
  body { margin: 0; padding: 0; background: #ffffff; font-family: 'BentonSansBook', Arial, sans-serif; color: #072146; }
  a { color: #1973B8; text-decoration: none; }
  .wrapper { max-width: 640px; margin: 0 auto; padding: 0 24px; }
  .preheader { text-align: left; font-size: 14px; color: #82939e; padding: 16px 0 8px; margin: 0 auto; max-width: 640px; padding-left: 24px; padding-right: 24px; }
  .separator { border: none; border-top: 2px solid #82939e; margin: 0 auto 8px; max-width: 640px; }
  .top { text-align: center; font-size: 14px; margin-bottom: 24px; }
  .top a { color: #82939e; text-decoration: none; font-size: 14px; }
  .hero { text-align: center; padding: 20px 0 30px; }
  .hero img { max-width: 290px; margin-bottom: 0px; }
  .purple-section { max-width: 640px; margin: 0 auto; background: #170f8f; padding: 26px 24px; border-radius: 18px 18px 0 0; }
  .purple-content { color: #ffffff; text-align: left; }
  .plazox-word { font-family: 'BentonSansMedium'; font-size: 18px; margin-bottom: 16px; text-transform: lowercase; font-style: italic; }
  .plazox-word::before { content: "●"; margin-right: 8px; font-size: 12px; vertical-align: middle; }
  .purple-content h1 { font-family: 'BentonSansMedium'; font-size: 39px; line-height: 1.2; margin-bottom: 16px; }
  .purple-content p { font-size: 16px; line-height: 1.6; margin-bottom: 24px; }
  .cta { display: inline-block; background: #3a6afd; color: #ffffff; padding: 14px 23px; border-radius: 7px; font-size: 20px; margin-bottom: 40px; }
  .purple-image { display: block; width: 100%; max-width: 640px; margin: 0 auto; border-radius: 16px; }
  .plazox-section { background-color: white; padding: 10px 24px; max-width: 640px; margin: 0 auto; }
  .plazox-section h2 { text-align: left; margin-bottom: 8px; font-family: 'BentonSansMedium'; font-size: 42px; color: #170f8f; }
  .plazox-content { display: flex; align-items: center; gap: 30px; flex-wrap: wrap; }
  .plazox-text { flex: 1 1 300px; text-align: left; color: #170f8f; }
  .plazox-text p { font-size: 16px; line-height: 1.6; margin: 0; }
  .plazox-image { flex: 1 1 300px; }
  .plazox-image img { max-width: 100%; height: auto; display: block; }
  .footer-block { max-width: 640px; margin: 0 auto; padding: 0 24px; }
  .footer-image { margin: 10px 0 0px; }
  .footer-image img { width: 100%; max-width: 100%; display: block; }
  .footer-columns { display: flex; border-top: 1px solid #000; border-bottom: 1px solid #000; text-align: center; font-family: 'BentonSansMedium'; font-size: 16px; color: #000; margin-bottom: 20px; }
  .footer-column { flex: 1; padding: 30px 10px; border-right: 1px solid #000; color:#000 }
  .footer-column:last-child { border-right: none; }
  .legal { font-size: 15px; line-height: 1.4; color: #82939e; padding-bottom: 40px; text-align: left; }
  .legal p { margin: 0 0 12px 0; }
  @media (max-width: 480px) { .purple-content h1 { font-size: 28px; } .plazox-section h2 { font-size: 24px; } .footer-columns { font-size: 14px; padding: 20px 8px; text-decoration: none; color: #000; display: block; } }
  </style>
</head>
<body>
  <div class="preheader">Asunto: Plazox, la nueva forma de fraccionar tus compras con Affinity Card Visa</div>
  <hr class="separator">
  <div class="top"><a href="https://www.affinitycard.es/">ABRIR LA VERSIÓN ONLINE |<strong> PUBLICIDAD</strong> </a></div>
  <div class="wrapper"><div class="hero"><img src="https://image.s7.sfmc-content.com/lib/fe9213737566017571/m/1/LOGO-AC-VISA.png" alt="Affinity Card Visa"></div></div>
  <div class="purple-section">
    <div class="purple-content">
      <div class="plazox-word">Plazox</div>
      <h1>Con plazox y tu Affinity Card<br> Visa, tus compras a tu manera.</h1> 
      <p>Fracciona al momento el pago de tus compras con la tarjeta Affinity Card Visa, tanto en comercios físicos como online.</p>
      <a href="https://www.affinitycard.es" class="cta">Quiero saber más</a>
      <div class="purple-image-section"><img src="https://image.s7.sfmc-content.com/lib/fe9213737566017571/m/1/IMAGE-PLAZOX.png" alt="Plazox" class="purple-image"></div>
    </div>
  </div>
  <div class="plazox-section">
    <h2>Tú decides qué compras y <br>también cómo lo pagas</h2>
    <div class="plazox-content">
      <div class="plazox-text"><p>BBVA es una de las entidades que está adherida al sistema Plazox.</p></div>
      <div class="plazox-image"><a href="https://www.bbva.es/personas.html"><img src="https://image.s7.sfmc-content.com/lib/fe9213737566017571/m/1/ILLUSTRATION-PLAZOX.png" alt="Plazox"></a></div>
    </div>
  </div>
  <div class="footer-block">
    <div class="footer-image"><a href="https://www.bbva.es/personas.html"><img src="https://image.s7.sfmc-content.com/lib/fe9213737566017571/m/1/FOOTER-BBVA2.png" alt="Footer BBVA"></a></div>
    <div class="footer-columns">
      <a href="https://www.affinitycard.es/condiciones" class="footer-column">CONDICIONES</a>
      <a href="tel:900108589" class="footer-column">900 108 589</a>
      <a href="https://www.affinitycard.es" class="footer-column">AFFINITYCARD.ES</a>
    </div>
    <div class="legal"><p>* Los intereses y comisiones aplicados...</p></div>
  </div>
</body>
</html>`;

export const LANDING_2_CORRECT_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Landing Page</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body { margin: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f2f4f7; }
.page-wrapper { max-width: 1200px; margin: 0 auto; width: 100%; padding: 30px 30px; box-sizing: border-box; }
.columns { display: flex; gap: 32px; flex-wrap: nowrap; }
.box { background: #ffffff; padding: 32px; border-radius: 10px; min-width: 300px; }
.box-form { flex: 0 0 calc(70% - 16px); }
.box-info { flex: 0 0 calc(30% - 16px); }
label { font-size: 14px; font-weight: bold; display: block; margin-bottom: 6px; }
.input-grey, select, input[type="file"] { width: 100%; padding: 12px; background: #f0f0f0; border: 1px solid #d6d6d6; border-radius: 4px; margin-bottom: 20px; font-family: Arial; box-sizing: border-box; }
.radio-row { display: flex; gap: 24px; margin-bottom: 20px; font-size: 14px; }
button { display: block; margin: 0 auto; padding: 14px 32px; background: #cd3755; color: #fff; border: none; border-radius: 4px; font-size: 16px; font-weight: bold; cursor: pointer; width: 100%; }
.info-list { list-style: decimal; margin-bottom: 32px; font-size: 18px; padding-left:22px }
.privacy { font-size: 13px; margin: 10px 0 20px 0; text-decoration: underline; text-decoration-color: #e6007e }
.info-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; margin-left: 12px; }
.info-header h3 { margin: 0; font-size: 48px; color: #d50f56; }
@media (max-width: 768px) { .columns { flex-direction: column; } .box-form, .box-info { flex: 1 1 100%; } }
</style>
</head>
<body>
<div class="page-wrapper">
<div class="columns">
  <div class="box box-form"> 
   <form id="cuestionarioForm">
      <label>Nombre:</label> <input class="input-grey" type="text" id="nombre" name="nombre" required> 
      <label>¿Por dónde prefieres que te contactemos?:</label>
      <div class="radio-row"> 
        <label><input type="radio" name="preferencia" value="Email" required> Email</label> 
        <label><input type="radio" name="preferencia" value="Telefono"> Teléfono</label> 
      </div> 
      <label>Email:</label> <input class="input-grey" type="email" id="email" name="email"> 
      <label>Adjunta una foto de tu factura:</label> <input type="file" id="file">
      <label>¿Cuándo prefieres que te contactemos?</label> 
      <select id="momento_contacto" name="momento_contacto" required><option value="">Elige una opción</option><option value="Mañana">Mañana</option></select> 
      <div class="privacy"><label><input type="checkbox" required> Acepto la Política de Datos</label></div> 
      <button type="button" id="button">Solicitar llamada</button>
    </form>
  </div>
  <div class="box box-info">
    <div class="info-header"><h3>Endesa</h3></div>
    <ol class="info-list"><li>Asesoramiento personalizado</li></ol>
  </div>
</div>
</div>
</body>
</html>`;

export const LANDING_3_CORRECT_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Landing Orange - Soluciones Digitales</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
    .page-wrapper { max-width: 1200px; margin: 0 auto; }
    .header { position: sticky; top: 0; z-index: 1000; background: #000; color: #fff; display: flex; justify-content: space-between; align-items: center; padding: 6px 40px; }
    .header-left img { height: 50px; }
    .header-phone strong { font-size: 20px; color: #ff7900; }
    .hero { display: flex; min-height: 400px; }
    .hero-text { width: 40%; padding: 40px 30px; display: flex; flex-direction: column; justify-content: center; gap: 20px; background: #eaeaea; }
    .hero-text h1 { font-size: 34px; margin: 0; color: #000; }
    .hero-ctas a { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #ff7900; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; font-size: 14px; }
    .hero-image { width: 60%; }
    .hero-image img { width: 100%; height: 100%; object-fit: cover; }
    .three-texts { display: flex; background: #ffffff; padding: 48px 20px; gap: 24px; }
    .banner-section { padding: 0px; background: #f5f5f5; margin: 20px 20px 0px 20px; }
    .banner-container { min-height: 300px; position: relative; }
    .banner-text { position: absolute; bottom: 30px; left: 30px; color: #fff; }
    @media (max-width: 768px) { .hero { flex-direction: column; } .hero-text, .hero-image { width: 100%; } .three-texts { flex-direction: column; } }
  </style>
</head>
<body>
  <div class="page-wrapper">
    <header class="header">
      <div class="header-left"><img src="https://image.s7.sfmc-content.com/lib/fe9213737566017571/m/1/Orange_Logo_RGB.jpg" alt="Orange"></div>
      <div class="header-phone"><strong>900 263 450</strong></div>
    </header>
    <section class="hero">
      <div class="hero-text"><h1>Soluciones digitales</h1><div class="hero-ctas"><a href="#">Te llamamos</a></div></div>
      <div class="hero-image"><img src="https://image.s7.sfmc-content.com/lib/fe9213737566017571/m/1/IMAGENorange_WebEmpresas.png" alt=""></div>
    </section>
    <section class="three-texts"><div class="item"><strong>Impulsa tus ventas</strong></div></section>
    <section class="banner-section"><div class="banner-container"><div class="banner-text"><p>Descubre todas las ventajas...</p></div></div></section>
  </div>
</body>
</html>`;

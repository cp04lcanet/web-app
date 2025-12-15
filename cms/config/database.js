const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
  const databaseUrl = env("DATABASE_URL", "postgres://avnadmin:AVNS_Xj0sX8oIq1VWacOCPMm@pg-d6517b2-cp04lcanet-bab6.g.aivencloud.com:21661/defaultdb?sslmode=require");
  const config = parse(databaseUrl);

  const aivenCa = `-----BEGIN CERTIFICATE-----
MIIEUDCCArigAwIBAgIUFjrkD9MM/Q8K5YbLMlTovz1PJjowDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1ZWZkNzkxN2YtOGU0Yi00NzU2LWExODQtYWViODA3YzY4
OGY5IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUxMjE1MjIwNDAxWhcNMzUxMjEzMjIw
NDAxWjBAMT4wPAYDVQQDDDVlZmQ3OTE3Zi04ZTRiLTQ3NTYtYTE4NC1hZWI4MDdj
Njg4ZjkgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAPNVdn6AAl5yroRw2ctixUO7FIpu9eQUSlizkFvuMUKZQ3YH+C85z8JA
vp7x2m+hlc/+ioqL2cBKVn8IHGNHfBheKuuhQqUgec8TmOvf3v0s7dSpvVzPL8/V
bRyvrgDQs3bH0TMX8ZHN/n7aUpFMRnYy3xqOly77OuVCHlFo6D3urDKIF6fTcWZ5
7vZd9Gybecfippju1ah78l80z5HtJOpZdMqCL+JiwaYMjtTXrYkcInDFvu+ajgxh
YKXvZriwzuFIjTNEyGEJc4+NZW5iuqITWg/vjDr74HTpyho9SNVgY+ARNyRNJ+9v
UF+FimIf249iwXbPwSU6g/MParBPevs/EByXkZtLS96kDZ/C8xNveoo5w7j0Duso
7epQNxhLLIRmBNkTQcyLnlWnAmz5IP6Zvc2N3aP/Zrxbi9Hl0q1EMYVhF1RthPDY
ckJ5Ivl6bv8x8KMRisqU8yH6JT3GFE7arq8lFpD/LYutIwWjyTGBzeymKMmRFlLJ
PiC35hQPYQIDAQABo0IwQDAdBgNVHQ4EFgQUNZbJFGXrBZfl3c+vx+OA2lG3foUw
EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
ggGBAJBOBAF3IQk7DqZcQuU32oCVYuChQBSn7cBylTm6QAx1STxjfwGyY6yMURxS
c8uzt1FlUIq0bwhVogdFUcXS7zMQNJRU4/D8MRCMQLt1T9JSr1Sr6cL56NVFzEy3
+/SbHzU8gK58G53oYj9WN5X7zyuTkdgnUeZcm5DblA2PdcEekGkLHxf3Ngq8BYrm
j9lfPfXNrEouJ0qcPhp3sMRmlX4XPWVuNJmjDzuCa/R4g+KvcH7xttfGau33ddFD
yvtCEUN06+b/FS7/5bgjEa5XJcy0nhUQ9EZ4ASh453mV6HZOSWSwvUnVN+bBHE27
7LsJV7KcAc6epOrglgaLw2tCUOWUdrP6PRmwHOG7zd25JfipWmaFWmxVKBT41jO9
xDqj6G6w+oGhs/FU3r3lOOhiGLyn0rOitmteYAsCZv53RINgdfCBwvFMd73nCqur
vdK0F/3+au1Gv3hvQUa6ncEVooeiz7wfBKHtFTRzWogl/0ZJVPPsoY+Li/MW2tFT
TeQX2w==
-----END CERTIFICATE-----`;

  return {
    connection: {
      client: "postgres",
      connection: {
        ...config,
        ssl: {
          rejectUnauthorized: true,
          ca: aivenCa,
        },
      },
    },
  };
};

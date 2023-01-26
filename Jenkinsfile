pipeline {
    agent any
    
       tools { nodejs "nodejs" }

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/TiaSuLibertaria/teste-api-cypress.git'
            }
        }
        
        stage('Instalar dependencias') {
            steps {
               sh 'npm install'
            }
        }
        
        stage('Executar teste') {
            steps {
               sh 'NO_COLOR=1 npm run cy:run'
            }
        }
    }
}

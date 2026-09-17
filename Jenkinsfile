pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out frontend source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci'
            }
        }

        stage('Build Angular') {
            steps {
                echo 'Building Angular frontend...'
                sh 'npm run build'
            }
        }

        stage('Verify Build') {
            steps {
                echo 'Checking Angular build output...'
                sh 'find . -type d -name browser -print'
                sh 'find . -type f -name index.html -print'
            }
        }
    }

    post {
        success {
            echo 'Frontend build completed successfully.'
        }

        failure {
            echo 'Frontend build failed.'
        }
    }
}
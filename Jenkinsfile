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

                sh '''
                    test -d ../iccc-smart-dashboard/src/main/resources/static/browser
                    test -f ../iccc-smart-dashboard/src/main/resources/static/browser/index.html

                    echo "Build output verified:"
                    du -sh ../iccc-smart-dashboard/src/main/resources/static/browser
                '''
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying frontend to staging server...'

                sh '''
                    scp -r ../iccc-smart-dashboard/src/main/resources/static/browser/* \
                    Administrator@172.30.0.116:"F:/nginx-1.29.3/html/"
                '''
            }
        }
    }

    post {
        success {
            echo 'Frontend build and staging deployment completed successfully.'
        }

        failure {
            echo 'Frontend build or deployment failed.'
        }
    }
}
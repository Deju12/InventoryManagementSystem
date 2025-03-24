from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serialiazers import UserSerializer
from rest_framework import status
from .models import User

#register
class RegisterViews(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

#login
class LoginViews(APIView):
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]
    
    def post(self,request):
        email=request.data['email']
        password=request.data['password']

        user=User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User Not Found!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password!')
        


        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        
        return Response({
            'access_token': access_token,  # Token to authenticate API requests
            'refresh_token': str(refresh),  # Token to refresh the access token
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        })

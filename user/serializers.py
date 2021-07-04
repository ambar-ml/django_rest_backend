from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from user.models import NewUser
from rest_framework.validators import UniqueValidator


class CustomUserSerializer(serializers.ModelSerializer):
    """ Currently unused in preference of the below.
    """
  
    


  
        

    email = serializers.EmailField(required=True)
  
                                    
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

   
        

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        print('attrs-',attrs['email'])
        user=NewUser.objects.filter(email=attrs['email']).exists()
        if user==False:
            return {'error':'email does not exist'}
        # The default result (access/refresh tokens)
        data = super(MyTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        data.update({'user': self.user.user_name})
        data.update({'email': self.user.email})
        # and everything else you want to send in the response
        return data
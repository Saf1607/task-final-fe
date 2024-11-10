<template>
    <v-container class="change-password" fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">Ubah Password</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="handleSubmit" ref="form">
                <v-text-field
                  label="Password Baru"
                  type="password"
                  v-model="newPassword"
                  :rules="[passwordRules.required, passwordRules.minLength]"
                  required
                ></v-text-field>
  
                <v-text-field
                  label="Konfirmasi Password Baru"
                  type="password"
                  v-model="confirmPassword"
                  :rules="[passwordRules.required, passwordRules.match]"
                  required
                ></v-text-field>
  
                <v-btn
                  color="primary"
                  type="submit"
                  :disabled="newPassword !== confirmPassword || !isValidForm"
                  class="mt-4"
                >
                  Ubah Password
                </v-btn>
              </v-form>
  
              <v-alert
                v-if="errorMessage"
                type="error"
                class="mt-4"
                :value="true"
              >
                {{ errorMessage }}
              </v-alert>
  
              <v-alert
                v-if="successMessage"
                type="success"
                class="mt-4"
                :value="true"
              >
                {{ successMessage }}
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import { useUserStore } from '@/stores/user';
  
  export default {
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        errorMessage: '',
        successMessage: '',
        passwordRules: {
          required: (value) => !!value || 'Password is required',
          minLength: (value) => value.length >= 6 || 'Password must be at least 6 characters',
          match: (value) => value === this.newPassword || 'Passwords do not match',
        },
      };
    },
    computed: {
      isValidForm() {
        // Validasi form agar hanya bisa submit jika password valid
        return this.newPassword.length >= 6 && this.newPassword === this.confirmPassword;
      },
    },
    methods: {
        async handleSubmit() {
  const userStore = useUserStore();
  const token = userStore.token || localStorage.getItem('token');
  console.log('Token:', token); // Periksa token di sini

  if (!token) {
    this.errorMessage = 'Token tidak ditemukan. Anda perlu login ulang.';
    return;
  }

  try {
    const response = await axios.post(
      'http://localhost:8080/auth/changepassword',
      {
        new_password: this.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Kirim token Bearer di sini
        },
      }
    );
    this.successMessage = 'Password berhasil diubah.';
    this.errorMessage = '';
  } catch (error) {
    console.log('Error response:', error.response);
    this.errorMessage = 'Gagal mengubah password. Pastikan password baru dan konfirmasi benar.';
    this.successMessage = '';
  }
},

    },
  };
  </script>
  
  <style scoped>
  .change-password {
    margin-top: 50px;
  }
  </style>
  
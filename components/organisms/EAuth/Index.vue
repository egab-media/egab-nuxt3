<template>
  <v-card
    data-test="auth-wrapper"
    class="rounded-xl mx-auto"
    :class="$vuetify.display.mobile ? '' : 'px-6'"
    width="600"
  >
    <v-container fluid>
      <!-- SECTION: Title -->
      <!--      <e-auth-title :is-editor="isEditor" :is-register="isRegister" />-->
      <!-- SECTION ./Title -->

      <!-- SECTION Subheader with social media login -->
      <!--      <e-auth-subtitle :form="form" :is-editor="isEditor" :is-register="isRegister" @loading="loading = $event" @error="error = $event" />-->
      <!-- SECTION ./Subheader with social media login -->

      <!--      <v-alert v-if="error" data-test="error" type="error">-->
      <!--        {{ error }}-->
      <!--      </v-alert>-->

      <!-- SECTION: Form -->
      <!--
        * NOTE: Current implementation is experimental
        * I am using one form entity for (register/login)
        * within each, a simple data structure is used
      -->
      <v-form
        ref="auth"
        v-model="valid"
        data-test="form"
      >
        <v-card-text>
          <v-row no-gutters>
            <!-- SECTION: Email field -->
            <e-text-field
              id="email"
              v-model="form.email"
              data-test="email"
              type="email"
              :hint="isRegister && isEditor ? $t('auth.form.email.hint', { openTag: '<a>', closeTag: '</a>' }) : undefined"
              dense
              persistent-hint
              :label="$t('auth.form.email.label', { type: isRegister ? isEditor ? $t('auth.status.work') : $t('auth.status.contact') : $t('auth.status.your') })"
              :rules="['required', 'email']"
            >
              <template #message="{ message }">
                <span>
                  {{ message }}
                </span>
              </template>
            </e-text-field>
            <!-- SECTION: ./Email field -->

            <e-text-field
              v-if="isRegister"
              id="name"
              v-model="form.name"
              data-test="name-input"
              autocomplete="name"
              dense
              persistent-hint
              :label="$t('auth.form.name.label')"
              counter
              :counter-value="v => v.trim().split(' ').length"
              :rules="['required', 'alpha', 'fullNameMinChars']"
            />

            <!--
              NOTE:
              * All rules are registered in the ETextField component.
                This empowers the validation scenarios & progress calculation.
                For more information, @see @/components/ETextField.vue

              * Id must be assigned as it will be used as a reference for progress calculation
            -->
            <!--            <e-auth-password :is-register="isRegister" :password.sync="form.password" @auth="handleAuthUsingEmailAndPassword" />-->

            <!--            <e-select-->
            <!--                v-if="isRegister"-->
            <!--                v-model="form.surveyValue"-->
            <!--                data-test="survey-select"-->
            <!--                :label="$t('auth.form.survey.label')"-->
            <!--                outlined-->
            <!--                dense-->
            <!--                return-object-->
            <!--                :items="[-->
            <!--                { id: 'search', text: $t('auth.form.survey.option1') },-->
            <!--                { id: 'referral', text: $t('auth.form.survey.option2') },-->
            <!--                { id: 'social', text: $t('auth.form.survey.option3') },-->
            <!--                { id: 'blog', text: $t('auth.form.survey.option4') },-->
            <!--                { id: 'other', text: $t('auth.form.survey.option5'), data: '' }-->
            <!--              ]"-->
            <!--                item-text="text"-->
            <!--                item-value="id"-->
            <!--                :placeholder="$t('auth.form.survey.placeholder')"-->
            <!--                :rules="['required']"-->
            <!--                class="mt-5"-->
            <!--            />-->

            <!--            <e-input-->
            <!--                v-if="isRegister && (form.surveyValue.id === 'other')"-->
            <!--                v-model="form.surveyValue.data"-->
            <!--                data-test="survey-other"-->
            <!--                id="survey"-->
            <!--                :label="$t('auth.form.survey.other.label')"-->
            <!--                :placeholder="$t('auth.form.survey.other.placeholder')"-->
            <!--                dense-->
            <!--                persistent-hint-->
            <!--                :rules="['required']"-->
            <!--            />-->
          </v-row>

          <!--          <v-row v-if="isRegister" data-test="disclaimer" class="text-body-2" align="center">-->
          <!--            <span class="mx-1">{{ $t('privacy.text') }}</span>-->
          <!--            <e-terms-->
          <!--                class="mx-1"-->
          <!--            />-->
          <!--            <span class="mx-1">{{ $t('privacy.and') }}</span>-->
          <!--            <e-privacy-policy />-->
          <!--          </v-row>-->
        </v-card-text>

        <!--        <v-card-actions>-->
        <!--          <e-btn-->
        <!--              data-test="action-btn"-->
        <!--              large-->
        <!--              block-->
        <!--              color="primary"-->
        <!--              rounded-->
        <!--              :loading="loading"-->
        <!--              :label="isRegister ? $t('auth.form.actions.continue') : $t('auth.form.actions.login')"-->
        <!--              @click.native="handleAuthUsingEmailAndPassword"-->
        <!--          />-->
        <!--        </v-card-actions>-->
      </v-form>
      <!-- SECTION: Form -->
    </v-container>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'EAuth',
  props: {
    isRegister: {
      type: Boolean,
      default: true
    },
    isEditor: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    openTerms: false,
    valid: true,
    loading: false,
    // error
    error: null as any,
    // form
    form: {
      email: '',
      name: '',
      password: '',
      surveyValue: ''
    },
    firestoreListener: null as any
  })
}
</script>

<script lang="ts" setup>
import { VCard, VCardText } from 'vuetify/components/VCard'
import { VForm } from 'vuetify/components/VForm'
import { VContainer, VRow } from 'vuetify/components/VGrid'
</script>

<style scoped>

</style>

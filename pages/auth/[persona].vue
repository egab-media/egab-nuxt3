<script setup lang="ts">
import { EAuth } from '@/features/authentication'
import { useDisplay } from 'vuetify'

const {mobile} = useDisplay()
</script>

<script lang="ts">
export default defineComponent({
  name: 'AuthPage',

  data() {
    return {
      title: 'Authentication',
      description: 'Login or create an account to access our platform as a Journalist or an editor.',
      isRegister: this.$route.query.action === 'signup',
      isEditor: this.$route.params.persona === 'editor',
      action: this.$route.query.action,
    }
  },

  head() {
    return {
      title: this.title,
      description: this.description,
      meta: [
        {hid: 'egab:auth:title', name: 'egab:auth:title', content: this.title},
        {hid: 'egab:auth:description', name: 'egab:auth:description', content: this.description},
        {
          hid: 'egab:auth:image:' + this.$route.params.persona,
          name: 'egab:auth:image:' + this.$route.params.persona,
          content: '/svg/' + this.$route.params.persona + '.svg',
        },
      ],
    }
  },

  methods: {
    handleSwitchAuth() {
      this.isRegister = !this.isRegister
      !this.isRegister
        ? this.$router.push({
          name: `auth-persona___${this.$i18n.locale}`,
          params: {persona: 'journalist'},
          query: {action: 'login'},
        })
        : this.$router.push({
          name: `auth-persona___${this.$i18n.locale}`,
          params: {persona: 'journalist'},
          query: {action: 'signup'},
        })
    },
  },
})
</script>

<template>
  <client-only>
    <v-container
      fill-height
      fluid
    >
      <v-row
        justify="center"
        align="center"
      >
        <e-fps />
        <!-- SECTION: Persona Illustration with text (left column) -->
        <v-col
          cols="5"
        >
          <molecules-e-state
            image-width="72%"
            :image-name="$route.params.persona"
            :title="$route.path !== '/auth/reset-password' ? $t('auth.illustration') : ''"
            text=""
          />
        </v-col>
        <!-- SECTION: ./Persona Illustration with text (left column) -->

        <!-- SECTION: Persona login (right column) -->
        <v-col :cols="'auto'">
          <!-- SECTION: AuthForm -->
          <!-- NOTE: Authentication mechanics are encapsulated in this form (login/signup) -->
          <e-auth
            v-if="$route.path !== '/auth/reset-password'"
            :is-editor="isEditor"
            :is-register="isRegister"
            class="mb-3"
          />
          <!-- SECTION: ./AuthForm -->

          <!-- TODO:  Reset Password Here     -->
          <!--        <e-reset-password v-else />-->

          <!-- SECTION: helper buttons for switching form (card width must equal to e-auth card width) -->
          <v-card
            color="transparent"
            flat
            width="600"
          >
            <v-card-text>
              <!-- NOTE: if user has already an account and needs to switch auth type -->

              <!-- CASE RESET PASSWORD PAGE -->
              <v-row
                v-if="$route.path === '/auth/reset-password'"
                justify="center"
                align="center"
              >
                <span class="mx-2">{{ $t('auth.has-account') }}</span>
                <e-btn
                  type="text"
                  color="primary"
                  :label="$t('auth.login-here')"
                  underline
                  @click="$router.push({ name: `auth-persona___${$i18n.locale}`, params: { persona: 'journalist' }, query: { action: 'login' } })"
                />
              </v-row>
              <!-- ./END: CASE RESET PASSWORD PAGE -->
              <v-row
                justify="center"
                align="center"
              >
                <span>{{ isRegister ? $t('auth.has-account') : $t('auth.new') }}</span>
                <e-btn
                  color="primary"
                  variant="text"
                  :text="isRegister ? $t('auth.login-here') : $t('auth.signup-here')"
                  underline
                  @click="handleSwitchAuth"
                />
              </v-row>

              <!--
                NOTE: if user needs to switch to signup per role.
                TODO: Enable when implementing Editor User Scope
              -->
              <!--            <v-row justify="center" align="center">-->
              <!--              <span class="mx-2">{{ isEditor ? $t('auth.looking-for-pitches') : $t('auth.create-pitches') }} </span>-->
              <!--              <e-btn-->
              <!--                text-->
              <!--                color="primary"-->
              <!--                :label="isEditor ? $t('auth.title', { status: $t('auth.status.create'), persona: $t('auth.personas.journalist') }) : $t('auth.title', { status: $t('auth.status.create'), persona: $t('auth.personas.editor') })"-->
              <!--                underline-->
              <!--                :to="{ name: 'auth-persona___' + $i18n.locale, params: { persona: isEditor ? 'journalist' : 'editor', action: 'signup' } }"-->
              <!--              />-->
              <!--            </v-row>-->
            </v-card-text>
          </v-card>
          <!-- SECTION: ./helper buttons for switching form -->
        </v-col>
        <!-- SECTION: ./Persona login (right column) -->
      </v-row>
    </v-container>
  </client-only>
</template>

<style scoped>

</style>

<template>
  <div class="container">
    <div class="pt-5">
      <b-button v-b-modal.modal-1>下の句入力Modal</b-button>
      <b-button v-b-modal.modal-2 variant="danger">お話Modal</b-button>
      <b-button v-b-modal.modal-3 variant="success">経過時間Modal</b-button>
      <b-button v-b-modal.modal-4 variant="outline-primary">優勝者決め</b-button>
    </div>

    <div v-for="( cp, i ) in cps" :key="i">
      {{ cp }}
    </div>
    <b-modal id="modal-1" centered="true" v-model="show">
      <b-form inline>
        <b-form-input v-model="speaker" placeholder="取り手" />
        <b-form-input v-model="couple" placeholder="CP名" />
      </b-form>

      <div slot="modal-footer">
        <b-button variant="primary" size="sm" class="float-right" @click="show=false">
          OK
        </b-button>
      </div>
    </b-modal>
    <b-modal id="modal-2">
      <p>取り手に推しCPの話を促すmodal</p>
    </b-modal>
    <b-modal id="modal-3">
      <div class="time">{{ formatTime }}</div>
      <p>お話の経過時間を表示するmodal</p>
    </b-modal>
    <b-modal id="modal-4">
      <p>優勝の取り手を選ぶmodal</p>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  data: () => ({
    show: false,
  }),
}
</script>

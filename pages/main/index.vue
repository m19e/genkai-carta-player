<template>
  <div class="container">
    <div class="pt-5 pb-5">
      <b-button v-b-modal.modal-0>上の句入力Modal</b-button>
      <b-button v-b-modal.modal-1>下の句入力Modal</b-button>
      <b-button v-b-modal.modal-2 variant="danger">お話催促Modal</b-button>
      <b-button v-b-modal.modal-3 variant="success">経過時間Modal</b-button>
      <b-button v-b-modal.modal-4 variant="outline-primary">優勝者決めModal</b-button>
    </div>
    <div class="h3">
      下の句
    </div>
    <div v-for="( prg, i ) in programs" :key="i">
      <div class="h2">
        {{ i+1 }}枚目 {{ prg.couple }} / {{ prg.speaker }}
      </div>
    </div>

    <b-modal id="modal-0" centered v-model="show">
      <b-form inline>
        <b-form-input v-model="speaker" placeholder="取り手" />
        <b-form-input v-model="couple" placeholder="CP名" />
      </b-form>

      <div slot="modal-footer">
        <b-button variant="primary" size="sm" class="float-right" @click="addCoupling">
          OK
        </b-button>
      </div>
    </b-modal>

    <b-modal id="modal-1" centered v-model="show">
      <b-form inline>
        <b-form-input v-model="speaker" placeholder="取り手" />
        <b-form-input v-model="couple" placeholder="CP名" />
      </b-form>

      <div slot="modal-footer">
        <b-button variant="primary" size="sm" class="float-right" @click="addCoupling">
          OK
        </b-button>
      </div>
    </b-modal>
    <b-modal id="modal-2">
      <p>取り手に推しCPの話を促すmodal</p>

    </b-modal>
    <b-modal id="modal-3">
      <!-- <div class="time">{{ formatTime }}</div> -->
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
    programs: [],
    speaker: '',
    couple: '',
    show: false,
    count: 0,
  }),
  watch: {
    programs: {
      handler(val, oldVal) {
        let add = this.programs.slice(-1)[0]
        this.makeToast(add.speaker, add.couple)
      },
      deep: true
    },
  },
  methods: {
    addCoupling() {
      this.programs.push({ speaker: this.speaker, couple: this.couple })
      this.show = false
      this.speaker = ''
      this.couple = ''
    },
    makeToast(who, cp) {
      this.$bvToast.toast(`[${who}]が[${cp}]を取りました`, {
        title: '下の句',
        autoHideDelay: 20000
      })
    },
  }
}
</script>

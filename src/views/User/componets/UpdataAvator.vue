<template>
  <div class="update-avator">
    <img :src="photo" class="img" ref="image" />

    <footer>
      <span @click="$parent.$parent.isShowAavtor = false">取消</span>
      <span @click="uploadAvator">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadAvator } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      require: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    // 上传头像
    uploadAvator() {
      this.$toast.loading({
        message: '正在上传...',
        forbidClick: true
      })
      try {
        // 1.拿到裁剪后的图片file对象
        this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
          // 2.发送请求
          const { data } = await uploadAvator(blob)
          // 3.更改父组件里的头像
          this.$emit('upload-avator', data.data.photo)
          // 4.关闭弹层
          this.$parent.$parent.isShowAavtor = false
          this.$toast.success('上传成功')
        })
      } catch (error) {
        this.$toast.fail('上传失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 57%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>

<?php
class PostCheck extends Base
{
    // POST値
    private $post_ary;

    // コンストラクタ
    public function __construct($post_ary)
    {
        $this->methodname = __FUNCTION__;
        $this->post_ary = $post_ary;
        // デバッグ情報
        $this->debug_log("POST値", $this->post_ary);
    }

    // ポスト値チェック
    public function getPostValue($key)
    {
        $this->methodname = __FUNCTION__;
        $ret = $this->post_ary[$key];
        if (preg_match("/^[a-zA-Z0-9_]+$/", $ret) == false) {
            $ret = '';
        }
        return $ret;
    }
}
?>
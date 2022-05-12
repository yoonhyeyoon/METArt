using UnityEngine;

public class GalleryManager : Singleton<GalleryManager>
{
    public bool IsActive { get; set; }
    public bool IsFocusUnity { get; set; }
    public Light light1, light2;

    private void Awake() {
        light1.intensity = 1.5f;
        light2.intensity = 1f;
        IsActive = true;
    }

    void Start() {
        #if !UNITY_EDITOR && UNITY_WEBGL
            WebGLInput.captureAllKeyboardInput = false;
        #endif
    }

    public void ActiveGallery() {
        IsActive = true;
    }

    public void DeactiveGallery() {
        IsActive = false;
    }
}

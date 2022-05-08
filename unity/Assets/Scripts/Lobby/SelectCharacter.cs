using UnityEngine;

public class SelectCharacter : MonoBehaviour
{
    void Update() {
        Vector3 Rotation = new Vector3(transform.rotation.eulerAngles[0], 0.2f, transform.rotation.eulerAngles[2]);
        transform.Rotate(Rotation);
    }
}

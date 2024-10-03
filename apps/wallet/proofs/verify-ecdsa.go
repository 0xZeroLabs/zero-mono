import (
    "github.com/consensys/gnark/frontend"
    "github.com/consensys/gnark/std/algebra/native/weierstrass"
)

// Signature represents an ECDSA signature
type Signature struct {
    R frontend.Variable // x-coordinate of point R
    S frontend.Variable // signature scalar s
}

// PublicKey represents an ECDSA public key
type PublicKey struct {
    X frontend.Variable
    Y frontend.Variable
}

// Verify implements ECDSA signature verification in a circuit
func Verify(api frontend.API, curve weierstrass.Curve, sig Signature, msg frontend.Variable, pubKey PublicKey) error {
    // 1. Check that s is in valid range (1 <= s <= n-1)
    // Note: In practice, you should add range checks for s

    // 2. Calculate w = s^(-1) mod n
    w := curve.MustNewScalar(api)
    w.Inverse(sig.S)

    // 3. Calculate u1 = m * w mod n
    u1 := curve.MustNewScalar(api)
    u1.Mul(msg, w)

    // 4. Calculate u2 = r * w mod n
    u2 := curve.MustNewScalar(api)
    u2.Mul(sig.R, w)

    // 5. Calculate point (x,y) = u1*G + u2*Q where G is generator and Q is public key
    p1 := curve.ScalarMul(api, curve.Generator(), u1)
    p2 := curve.ScalarMul(api, pubKey, u2)
    result := curve.Add(api, p1, p2)

    // 6. Verify that x coordinate of the result equals r
    api.AssertIsEqual(result.X, sig.R)

    return nil
}

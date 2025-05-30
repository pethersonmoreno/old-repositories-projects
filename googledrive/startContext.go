package googledrive

import "context"

var ctx context.Context = nil

func StartContext() {
	ctx = context.Background()
}

func getContext() context.Context {
	return ctx
}
